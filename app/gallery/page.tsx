import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { formatEventDate, getPublishedAlbums } from "../lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from services, events and church life at Foundation Faith Church, Salem City of Faith in Port Harcourt.",
};

export default async function GalleryPage() {
  const albums = await getPublishedAlbums();

  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments from church life" intro="Photos from our services, events and gatherings." />
      <Container className="py-14 sm:py-20">
        {albums.length === 0 ? (
          <p className="text-center text-muted-foreground">New albums are on the way. Check back soon.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.id}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    {album.cover?.previewUrl && (
                      // unoptimized: signed URLs change on every request, so the
                      // optimizer would cache a new copy each time for no gain.
                      <Image
                        src={album.cover.previewUrl}
                        alt={album.cover.alt_text}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{formatEventDate(album.event_date)}</p>
                    <h2 className="mt-2 text-xl font-semibold group-hover:text-primary">{album.title}</h2>
                    {album.description && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{album.description}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
