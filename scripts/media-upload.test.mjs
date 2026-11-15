import test from "node:test";
import assert from "node:assert/strict";
import { savePreparedPhoto, deletePhoto, checkPhotoFiles, preparePhoto } from "../app/lib/media-upload.ts";

function fixture(options = {}) {
  const events = [];
  const photo = { id: "photo", album_id: "album", original_path: "original.jpg", preview_path: "preview.webp" };
  const client = {
    storage: { from(bucket) { return {
      async upload(path) {
        events.push(["upload", bucket, path]);
        return { error: options.failUpload === bucket ? { message: "failed" } : null };
      },
      async remove(paths) {
        events.push(["remove", bucket, paths]);
        return { error: options.failRemove === bucket ? { message: "failed" } : null };
      },
      async exists() { return { data: options.missing !== bucket, error: null }; },
    }; } },
    from() { return {
      insert(row) { events.push(["insert", row]); return { select() { return {
        async single() { return { data: row, error: options.failInsert ? { message: "lost response" } : null }; },
      }; } }; },
      select() { return { eq() { return {
        async maybeSingle() { events.push(["confirm"]); return { data: options.committed ? photo : null, error: options.failConfirm ? {} : null }; },
      }; } }; },
      update(row) { events.push(["hide", row]); return { eq() { return { select() { return {
        async single() { return { data: photo, error: options.failHide ? {} : null }; },
      }; } }; } }; },
      delete() { events.push(["delete-row"]); return { eq() { return { select() { return {
        async single() { return { data: photo, error: null }; },
      }; } }; } }; },
    }; },
  };
  return { client, events, photo };
}
const prepared = {
  original: new File(["original"], "Sunday service.jpg", { type: "image/jpeg" }),
  preview: new Blob(["preview"], { type: "image/webp" }),
  width: 4000, height: 3000, extension: "jpg",
};

test("both files finish before the visible photo record is saved", async () => {
  const { client, events } = fixture();
  const photo = await savePreparedPhoto(client, "album", "Sunday", prepared, 4);
  assert.deepEqual(events.map(e => e[0]), ["upload", "upload", "insert"]);
  assert.equal(photo.is_published, true);
  assert.equal(photo.original_filename, "Sunday service.jpg");
  assert.equal(photo.sort_order, 4);
  assert.match(photo.original_path, /^album\/[0-9a-f-]+\.jpg$/);
  assert.equal(photo.original_path.replace(/\.jpg$/, ""), photo.preview_path.replace(/\.webp$/, ""));
});

test("a failed preview upload cleans up both unique paths and never creates a row", async () => {
  const { client, events } = fixture({ failUpload: "gallery-previews" });
  await assert.rejects(savePreparedPhoto(client, "album", "Sunday", prepared, 0), /preview could not/);
  assert.deepEqual(events.map(e => e[0]), ["upload", "upload", "remove", "remove"]);
});

test("a lost insert response does not delete files belonging to a committed photo", async () => {
  const { client, events, photo } = fixture({ failInsert: true, committed: true });
  assert.equal(await savePreparedPhoto(client, "album", "Sunday", prepared, 0), photo);
  assert.equal(events.some(e => e[0] === "remove"), false);
});

test("an unconfirmed insert leaves files intact and requests refresh instead of risking data loss", async () => {
  const { client, events } = fixture({ failInsert: true, failConfirm: true });
  await assert.rejects(savePreparedPhoto(client, "album", "Sunday", prepared, 0), /couldn’t confirm/);
  assert.equal(events.some(e => e[0] === "remove"), false);
});

test("an insert known not to have committed cleans up both files", async () => {
  const { client, events } = fixture({ failInsert: true });
  await assert.rejects(savePreparedPhoto(client, "album", "Sunday", prepared, 0), /details could not/);
  assert.equal(events.filter(e => e[0] === "remove").length, 2);
});

test("cleanup failure is reported explicitly", async () => {
  const { client } = fixture({ failUpload: "gallery-previews", failRemove: "gallery-originals" });
  await assert.rejects(savePreparedPhoto(client, "album", "Sunday", prepared, 0), /could not be cleaned up/);
});

test("deletion hides the photo, removes both files, then deletes its row", async () => {
  const { client, events, photo } = fixture();
  await deletePhoto(client, photo);
  assert.deepEqual(events.map(e => e[0]), ["hide", "remove", "remove", "delete-row"]);
  assert.deepEqual(events[0][1], { is_published: false, is_cover: false });
});

test("failed file deletion keeps the hidden row so cleanup can be retried", async () => {
  const { client, events, photo } = fixture({ failRemove: "gallery-originals" });
  await assert.rejects(deletePhoto(client, photo), /now hidden/);
  assert.equal(events.some(e => e[0] === "delete-row"), false);
});

test("a rejected hide operation prevents file deletion", async () => {
  const { client, events, photo } = fixture({ failHide: true });
  await assert.rejects(deletePhoto(client, photo), /hide the picture/);
  assert.deepEqual(events.map(e => e[0]), ["hide"]);
});

test("a missing original prevents a picture being made visible", async () => {
  const { client, photo } = fixture({ missing: "gallery-originals" });
  await assert.rejects(checkPhotoFiles(client, photo), /missing an original or preview/);
});

test("unsupported files and empty files are rejected before image decoding", async () => {
  await assert.rejects(preparePhoto(new File(["text"], "notes.txt", { type: "text/plain" })), /JPG, PNG, or WebP/);
  await assert.rejects(preparePhoto(new File([], "empty.jpg", { type: "image/jpeg" })), /50 MB/);
});
