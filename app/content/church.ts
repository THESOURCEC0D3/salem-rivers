/**
 * Salem Rivers — single source of content.
 *
 * EVERYTHING IN [SQUARE BRACKETS] IS A PLACEHOLDER and must be confirmed with the
 * real church before launch. Swap values here and every page updates. Photos are
 * listed inline (each `photo` field) so you know exactly which real images to supply.
 */

export type ServiceTime = { label: string; time: string };
export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  blurb: string;
  flyer: string; // placeholder label for the event flyer image
};
export type PastEvent = {
  id: string;
  title: string;
  date: string;
  photo: string; // placeholder label for the photo
};
export type Testimonial = {
  quote: string;
  name: string;
  context?: string;
  photo?: string | null; // optional — a person's photo, only if they want one
};
export type Department = {
  name: string;
  blurb: string;
  photo: string; // placeholder label for the department image
};
export type ExpectBeat = { q: string; a: string };
export type Belief = { title: string; body: string };
export type Leader = { name: string; role: string; photo: string; bio: string };

export const church = {
  /** [CONFIRM] Official church name. */
  name: "Salem Rivers",
  /** Short identity used in the footer + search engine schema (not the hero). */
  identity: "A warm Pentecostal family in Port Harcourt.",
  /** The one nice line under the hero title. */
  tagline:
    "In Salem God is making many mighty through the Word and Prayer",

  city: "Port Harcourt",
  state: "Rivers State",
  neighbourhood: "Rumuomasi",

  /** One Sunday service + midweek. */
  serviceTimes: [
    { label: "Sunday Service", time: "7:00 AM" },
    { label: "Wednesday · Bible Study", time: "5:30 PM" },
  ] satisfies ServiceTime[],

  /** Canonical Name/Address/Phone — keep identical everywhere for local SEO. */
  address: "1 Faith Avenue, Rumuomasi, Port Harcourt, Rivers State",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1+Faith+Avenue%2C+Rumuomasi%2C+Port+Harcourt%2C+Rivers+State",
  /** Embeddable map URL (Google Maps → Share → Embed). */
  mapEmbedUrl:
    "https://www.google.com/maps?q=1%20Faith%20Avenue%2C%20Rumuomasi%2C%20Port%20Harcourt%2C%20Rivers%20State&output=embed",

  phone: "0703 065 9232",
  phoneHref: "tel:+2347030659232",
  email: "info@salemrivers.org",

  /** International format, digits only, no “+”. Used for wa.me links. */
  whatsappNumber: "2347030659232",

  pastor: {
    name: "Bishop Hilary Ogoliegbune",
    title: "Bishop",
    words:
      "We are sent of God to raise a triumphant people: A people strong in Faith, A people empowered by Wisdom, and A people intimate with the Holy Spirit.",
    photo: "[A genuine, friendly photo of the pastor]",
  },

  /** Plan Your Visit (the keystone page). All [BRACKETS] to confirm with the church. */
  visit: {
    opener:
      "Thinking about visiting? Here's everything you need — no surprises, no pressure. By the time you arrive, it'll already feel familiar.",
    logistics: {
      duration: "[About 2 hours]",
      parking: "[Free parking is available right by the church]",
      entrance:
        "[Come in through the main entrance — a welcomer will be there to meet you]",
    },
    whatToExpect: [
      {
        q: "What's the worship like?",
        a: "Lively, heartfelt Pentecostal praise — singing, music, and prayer. Expect joy and energy, with quieter moments to reflect and pray.",
      },
      {
        q: "What happens when I arrive?",
        a: "A welcomer greets you at the door, helps you find a seat, and points you to anything you need. You can simply sit, relax, and take it in.",
      },
      {
        q: "Will I be singled out?",
        a: "No. There's no spotlight on guests and no pressure to stand, speak, or give. You're free to just experience the service.",
      },
      {
        q: "What should I wear?",
        a: "Come as you are. Some dress up, many come casual — you'll fit in either way. Wear whatever you're comfortable in.",
      },
    ] satisfies ExpectBeat[],
    kids: {
      title: "Your kids are in good hands",
      body: "We love having children, and we take their safety and joy seriously. During the service they're cared for by a warm, vetted team in a space made just for them.",
      points: [
        "[Children's church for ages … during the main service]",
        "[Simple, secure check-in and check-out]",
        "[Where to take them when you arrive]",
      ],
    },
    welcomeVideo: {
      youtubeId: null as string | null,
      label: "[30–60s welcome video — the room, the worship, the people]",
    },
  },

  /** About page — the deeper "who we are + how we function". [CONFIRM wording with the church] */
  about: {
    intro: [
      "Salem Rivers is a warm Pentecostal family in Port Harcourt. We're ordinary people from every walk of life, brought together by Jesus and a shared hunger to know God and love our city.",
      "We're not a perfect church — we're a real one. Whoever you are, however you come, you'll find a place to belong here.",
    ],
    // Plain-language beliefs, not a theology dump. [CONFIRM exact wording with leadership.]
    beliefs: [
      {
        title: "The Bible",
        body: "We hold the Bible as God's living word — our guide for faith, life, and everything we do.",
      },
      {
        title: "Jesus",
        body: "At the centre of everything is Jesus: God's Son, who saves, heals, and welcomes anyone who comes.",
      },
      {
        title: "The Holy Spirit",
        body: "We believe the Holy Spirit is active today — empowering, comforting, and leading God's people.",
      },
      {
        title: "Prayer",
        body: "We're a praying church. We bring everything, big and small, to God — and we expect Him to answer.",
      },
      {
        title: "Family & belonging",
        body: "Church is family. We do life together: celebrating, grieving, growing, and serving side by side.",
      },
      {
        title: "Our city",
        body: "We're here for Port Harcourt — sharing God's love in word and in practical action.",
      },
    ] satisfies Belief[],
    howWeFunction: {
      intro:
        "We're a volunteer-powered family. Here's how things work week to week — and how you can be part of it.",
      membership: {
        title: "Becoming part of the family",
        body: "[Outline the real membership path — e.g. start attending, join a newcomers' class, then get connected to a unit. Confirm the actual steps.]",
      },
      rhythms: {
        title: "Our weekly rhythm",
        body: "Sunday gathering for worship and the word, midweek Bible study, and units that meet through the week. [Confirm details.]",
      },
      // The serving teams (departments) are defined once in `departments` above and reused here.
    },
    // Leadership — real photos + short intros. [CONFIRM names, roles, bios, photos]
    leadership: [
      {
        name: "Bishop Hilary Ogoliegbune",
        role: "Bishop",
        photo: "[Photo of the Bishop]",
        bio: "[A warm two-line introduction — heart for the church, family, how long they've served.]",
      },
      {
        name: "[Name]",
        role: "[Assistant Pastor]",
        photo: "[Photo]",
        bio: "[Short, warm introduction.]",
      },
      {
        name: "[Name]",
        role: "[Elder / Departmental Head]",
        photo: "[Photo]",
        bio: "[Short, warm introduction.]",
      },
    ] satisfies Leader[],
    vision:
      "Our heart is to see a Port Harcourt where everyone has a church family to belong to — a people growing in God, lifting one another, and carrying His love to every corner of our city. [Refine with the church's own vision statement.]",
  },

  /** Testimonies — CLEARED by the church for launch. Carousel on the homepage. */
  testimonials: [
    {
      quote:
        "I came in not knowing a single person, just to see what it was like. By the end someone had prayed with me and invited me back. I've never looked back.",
      name: "[First name]",
      context: "First visited [last year]",
      photo: "[Photo of person]",
    },
    {
      quote:
        "This is the first place that felt like family from day one. My kids love it, and honestly, so do I.",
      name: "[First name]",
      context: "Member since [year]",
      photo: null,
    },
    {
      quote:
        "I was nervous about walking in alone. Nobody made a fuss — they just made room for me. That meant everything.",
      name: "[First name]",
      context: "[Context]",
      photo: "[Photo of person]",
    },
    {
      quote:
        "The worship, the warmth, the prayer — I drive past three churches to be here, and every Sunday it's worth it.",
      name: "[First name]",
      context: "[Context]",
      photo: null,
    },
  ] satisfies Testimonial[],

  /** Get involved — serving teams. [CONFIRM blurbs, especially KDF] */
  departments: [
    {
      name: "Technical / Media",
      blurb:
        "Sound, cameras, livestream and slides — helping every service reach the room and the world online.",
      photo: "[Media team at the sound desk / cameras]",
    },
    {
      name: "Ushering",
      blurb:
        "The first warm smile at the door. Welcoming, seating and helping everyone feel at home.",
      photo: "[Ushers welcoming people]",
    },
    {
      name: "Choir",
      blurb: "Leading the whole family into worship through song and music.",
      photo: "[Choir leading worship]",
    },
    {
      name: "Sanitation",
      blurb:
        "Keeping God's house clean, fresh and welcoming for everyone who walks in.",
      photo: "[Sanitation team]",
    },
    {
      name: "Protocol",
      blurb:
        "Order and hospitality — caring for guests and ministers so every service runs smoothly.",
      photo: "[Protocol team]",
    },
    {
      name: "Kingdom Dominion Force (KDF)",
      blurb:
        "[Describe KDF] — a force for prayer, evangelism and taking the gospel beyond the walls.",
      photo: "[KDF team]",
    },
  ] satisfies Department[],

  /**
   * Events — upcoming (nearest first) + past (photo evidence of community life).
   * Keep `upcoming` current: a stale event at the top is a credibility killer.
   * The homepage's "next event" is simply `events.upcoming[0]`.
   */
  events: {
    upcoming: [
      {
        id: "q2-thanksgiving",
        title: "2nd Quarter Thanksgiving",
        date: "Sunday, 2 August 2026",
        time: "7:00 AM",
        location: "Church Auditorium, #1 Faith Avenue, Rumuomasi",
        blurb:
          "A morning of praise and gratitude as we mark the second quarter together — with Archbishop Dr Sam Amaga as chief host. Come and rejoice with us.",
        flyer: "2nd Quarter Thanksgiving flyer",
      },
      {
        id: "covenant-week",
        title: "Covenant Week of Celebration",
        date: "[1st - 5th July]",
        time: "[8:00 AM]",
        location: "[Main Auditorium]",
        blurb:
          "A morning of celebration, music, and thanksgiving — a warm first Sunday to walk into.",
        flyer: "[Event flyer / poster]",
      },
      {
        id: "family-friends-sunday",
        title: "[Family & Friends Sunday]",
        date: "[Sun, 13 July]",
        time: "[8:00 AM]",
        location: "[Main Auditorium]",
        blurb:
          "[A special Sunday to bring someone with you — worship, the word, and a warm welcome.]",
        flyer: "[Event flyer]",
      },
      {
        id: "midweek-revival",
        title: "[Midweek Revival Night]",
        date: "[Wed, 16 July]",
        time: "[5:30 PM]",
        location: "[Main Auditorium]",
        blurb: "[An evening of worship and prayer in the middle of the week.]",
        flyer: "[Event flyer]",
      },
    ] satisfies ChurchEvent[],
    past: [
      {
        id: "past-thanksgiving",
        title: "[Annual Thanksgiving]",
        date: "[June 2026]",
        photo: "[Congregation celebrating together]",
      },
      {
        id: "past-outreach",
        title: "[Community Outreach]",
        date: "[May 2026]",
        photo: "[Outreach in the community]",
      },
      {
        id: "past-youth",
        title: "[Youth Conference]",
        date: "[April 2026]",
        photo: "[Young people worshipping]",
      },
      {
        id: "past-baptism",
        title: "[Baptism Sunday]",
        date: "[March 2026]",
        photo: "[Baptism celebration]",
      },
    ] satisfies PastEvent[],
  },

  /** Watch (subordinate fallback). [CONFIRM] */
  watch: {
    nextLiveLabel: "Live this Sunday from 7:00 AM",
    youtubeUrl: "https://youtube.com/@example",
    facebookUrl: "https://facebook.com/example",
  },

  /** Giving — a key feature; linked from the hero and (when cleared) the footer. */
  give: {
    enabled: false, // footer link toggle — flip on once the church clears it
    href: "/give",
  },

  socials: {
    facebook: "https://facebook.com/example",
    youtube: "https://youtube.com/@example",
    instagram: "https://instagram.com/example",
  },

  /** Real photos to supply for the hero + glimpse strip. */
  photos: {
    hero: "[Wide, warm photo of the congregation — faces, joy, real service]",
    glimpse: [
      "[Worship moment]",
      "[People greeting / fellowship]",
      "[Children's church]",
      "[An event or outreach]",
    ],
  },
} as const;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${church.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Primary nav. Newcomers go to About for the full picture of the church; the
 * Plan Your Visit button is the only link to /visit. Contact lives in the footer.
 */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/watch", label: "Watch" },
] as const;

/** The single destination almost every CTA points to. */
export const PLAN_VISIT_HREF = "/visit";
