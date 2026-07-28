import Image from "next/image";
import { church, whatsappLink } from "../../content/church";
import { Container } from "../Container";
import { WhatsAppIcon } from "../icons";

/** Section 4 — the Bishop's genuine, plain, warm welcome. */
export function PastorWelcome() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          {/* Photo sits in the left column and he faces right — into the quote. */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src="/images/BishopHillary.png"
              alt={`${church.pastor.name}, ${church.pastor.title} of ${church.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 24rem"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent">
              A word from our Bishop
            </p>
            <blockquote className="text-balance font-serif text-2xl leading-snug text-foreground sm:text-3xl">
              &ldquo;{church.pastor.words}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="text-lg font-semibold text-foreground">
                {church.pastor.name}
              </p>
              <p className="text-muted-foreground">{church.pastor.title}</p>
            </div>
            <a
              href={whatsappLink(
                `Hello Bishop, I'd like to ask a question about ${church.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-whatsapp-hover hover:underline"
            >
              <WhatsAppIcon size={20} />
              Have a question? Message us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
