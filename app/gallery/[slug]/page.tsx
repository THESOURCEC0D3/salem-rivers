import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../components/Container";
import { PageHero } from "../../components/PageHero";
import { formatEventDate, getPublishedAlbum } from "../../lib/gallery";
import { PhotoGrid } from "./PhotoGrid";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getPublishedAlbum((await params).slug);
  if (!result) return { title: "Album not found" };
  return {
    title: result.album.title,
    description: result.album.description || `Photos from ${result.album.title}.`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const result = await getPublishedAlbum((await params).slug);
  // Drafts and unknown slugs look identical to visitors: both are a 404.
  if (!result) notFound();
  const { album, photos } = result;

  return (
    <>
      <PageHero eyebrow={formatEventDate(album.event_date)} title={album.title} intro={album.description || undefined}>
        <Link href="/gallery" className="mt-6 text-sm font-semibold text-primary hover:underline">← All albums</Link>
      </PageHero>
      <Container className="py-14 sm:py-20">
        {photos.length === 0
          ? <p className="text-center text-muted-foreground">Photos for this album are on the way.</p>
          : <PhotoGrid photos={photos} />}
      </Container>
    </>
  );
}
