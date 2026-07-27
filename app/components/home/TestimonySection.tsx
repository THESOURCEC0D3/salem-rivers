import Image from "next/image";
import testimonyBg from "../../../public/images/testimonybackgroundimage.jpg";
import { church } from "../../content/church";
import { Container } from "../Container";
import { Testimonials } from "../Testimonials";

/**
 * Testimonies over a full-bleed photo of the congregation in worship.
 *
 * Built as a plain <section> + Container rather than <Section> (following ReadyToJoin),
 * because that wrapper's eyebrow/heading colours are tuned for light backgrounds and
 * would land dark-on-dark here.
 */
export function TestimonySection() {
  return (
    <section
      id="testimonies"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Full width of the viewport — the section is the positioning context, not Container */}
      <Image
        src={testimonyBg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/*
        This photo is bright and busy (light suits, faces, a red banner), so the overlay
        has to be heavy — anything lighter and the quotes start fighting the background.
      */}
      <div className="absolute inset-0 -z-10 bg-black/75" />

      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft">
            Testimonies
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            What people say
          </h2>
        </div>

        <Testimonials items={[...church.testimonials]} />
      </Container>
    </section>
  );
}
