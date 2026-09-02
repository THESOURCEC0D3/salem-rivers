import { church, whatsappLink } from "../../content/church";
import { Container } from "../Container";
import { Button } from "../Button";
import { WhatsAppIcon } from "../icons";

/**
 * Need prayer — deliberately the quietest section on the page.
 *
 * Plain <section> + a single soft card rather than <Section>'s full eyebrow /
 * heading stack, and no photography, badges or shadows beyond `shadow-sm`. This
 * moment should feel like an open hand, not a pitch — so it sits between the
 * loud testimony block and the closing visit CTA and lowers the volume.
 *
 * WhatsApp-first like every other contact path on the site (no forms).
 */
export function NeedPrayer() {
  return (
    <section id="prayer" className="bg-gold-wash-2 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-gold-wash-1 p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {church.prayer.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {church.prayer.body}
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              href={whatsappLink(church.prayer.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              external
            >
              <WhatsAppIcon size={20} />
              Request prayer
            </Button>
          </div>

          {/*
            The blessing sits HERE, as the church speaking to the visitor, and
            not inside the prefilled WhatsApp message — there the visitor is the
            sender, so it would be blessing the church on their behalf.
            The name line only repeats what the composer already shows, so it is
            phrased as reassurance rather than a second instruction.
          */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            WhatsApp will open with your message ready — just add your name and
            send. The Lord bless you.
          </p>
        </div>
      </Container>
    </section>
  );
}
