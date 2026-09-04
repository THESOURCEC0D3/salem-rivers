/**
 * Salem City of Faith — single source of content.
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
export type ChurchClass = {
  id: string;
  /** Short form as printed on the flyer, e.g. "C.F.B.I". */
  acronym: string;
  /** Dotless short form used in running prose, e.g. "CFBI". */
  short: string;
  /** Full name as printed on the flyer. */
  name: string;
  /** Which months it runs, e.g. "May to June". No year — see `classes.year`. */
  season: string;
  /** Which days it meets, e.g. "Weekends". */
  meets: string;
  /** Start time. The flyer prints the literal word "TIME", so this is unknown. */
  time: string;
  /** One sentence, for the homepage preview card. */
  summary: string;
};
export type PastEvent = {
  id: string;
  title: string;
  date: string;
  photo: string; // placeholder label for the photo
};
export type Testimonial = {
  quote: string;
  /**
   * Optional. A testimony may be published unattributed — the card omits the
   * whole caption when this is absent rather than printing a placeholder.
   */
  name?: string;
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

/* ---- About page shapes ---- */
/** One dated beat on the heritage timeline. `year` may read "Today"/"Since then". */
export type TimelineEntry = { year: string; title: string; body: string };
/** A titled statement with no icon — vision pillars, passions. */
export type Pillar = { title: string; body: string };
/**
 * A titled statement WITH an icon. `icon` is a key into the icon map declared by
 * the rendering component (same indirection as `beatIcons`) so this content file
 * never imports React.
 */
export type IconedItem = {
  title: string;
  body: string;
  icon: string;
  /** Optional schedule line, rendered as a chip above the body (e.g. "Mondays, 6:00 PM"). */
  when?: string;
};
export type JourneyStep = { title: string; body: string };
export type Faq = { q: string; a: string };
/**
 * PARKED — used only by the unrendered `home/LatestSermon.tsx`. A sermon feature
 * is deferred and conditional on church clearance (HANDOFF §8c); do not build on
 * this without that clearance. Kept so the parked component still type-checks.
 */
export type Sermon = {
  title: string;
  speaker: string;
  date: string;
  description: string;
  /**
   * The 11-character YouTube VIDEO ID — not the full URL.
   *   https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
   *   https://youtu.be/dQw4w9WgXcQ               → "dQw4w9WgXcQ"
   *   https://www.youtube.com/live/dQw4w9WgXcQ   → "dQw4w9WgXcQ"
   * null = no video yet; the player renders a disabled placeholder.
   */
  youtubeId: string | null;
  /** Placeholder label for the sermon still/thumbnail. */
  thumbnail: string;
  /** Fallback for "Watch now" when there is no embeddable video yet. */
  watchHref: string;
};

export const church = {
  /*
   * TWO NAME FIELDS, ON PURPOSE. Confirmed 9 August 2026; the old "[CONFIRM]"
   * flag is resolved and the working title "Salem Rivers" is retired.
   *
   *   name      — the official name. Labels: footer, page <title>, the local-SEO
   *               JSON-LD in layout.tsx, WhatsApp greetings. Reach for this one
   *               by default.
   *   shortName — the same church inside running prose. The full name is six
   *               words and reads like boilerplate mid-sentence.
   *
   * There WAS a third field, `navName`, holding "Foundation Faith Church, Salem
   * Rivers" so the navbar could keep the retired wording. It is gone: the navbar
   * now renders the church's logo artwork instead of any text, and that artwork
   * reads "Foundation Faith Church / Salem City of Faith". Nothing rendered the
   * field any more, and leaving it would have been a string that looks
   * authoritative while affecting nothing.
   *
   * A welcome side effect: Name/Address/Phone is consistent again. The navbar,
   * the <title> and the SEO schema all say the same thing, which is what the
   * comment on `address` below asks for.
   */
  name: "Foundation Faith Church, Salem City of Faith",
  shortName: "Salem City of Faith",
  /** Short identity used in the footer + search engine schema (not the hero). */
  identity: "A warm Pentecostal family in Port Harcourt.",
  /** The one nice line under the hero title. */
  tagline:
    "In Salem God is making many mighty through the Word and Prayer",

  city: "Port Harcourt",
  state: "Rivers State",
  neighbourhood: "No.1 Faith Avenue, Rumuomasi",

  /** One Sunday service + midweek. */
  serviceTimes: [
    { label: "Sunday Service", time: "7:00 AM" },
    { label: "Wednesday Service", time: "5:30 PM" },
  ] satisfies ServiceTime[],

  /** Canonical Name/Address/Phone — keep identical everywhere for local SEO. */
  address: "No.1 Faith Avenue, Rumuomasi, Port Harcourt, Rivers State",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1+Faith+Avenue%2C+Rumuomasi%2C+Port+Harcourt%2C+Rivers+State",
  /** Embeddable map URL (Google Maps → Share → Embed). */
  mapEmbedUrl:
    "https://www.google.com/maps?q=1%20Faith%20Avenue%2C%20Rumuomasi%2C%20Port%20Harcourt%2C%20Rivers%20State&output=embed",

  phone: "0703 152 2204",
  phoneHref: "tel:+2347031522204",
  email: "info@salemrivers.org",

  /*
   * ONE NUMBER FOR THE WHOLE SITE. `phone` (displayed), `phoneHref` (the
   * tel: link), the JSON-LD `telephone` in layout.tsx and this field are all
   * the same line, by explicit request. Local SEO wants Name/Address/Phone
   * identical everywhere, so if one moves, move all four together.
   *
   * This field is the wa.me form: international, digits only, no plus sign.
   */
  whatsappNumber: "2347031522204",

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
      "Thinking about visiting? Here's everything you need. No surprises, no pressure. By the time you arrive, it'll already feel familiar.",
    logistics: {
      duration: "[About 2 hours]",
      parking: "[Free parking is available right by the church]",
      entrance:
        "[Come in through the main entrance, where a welcomer will be there to meet you]",
    },
    whatToExpect: [
      {
        q: "What's the worship like?",
        a: "Lively, heartfelt Pentecostal praise with singing, music, and prayer. Expect joy and energy, with quieter moments to reflect and pray.",
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
        a: "Come as you are. Some dress up, many come casual, and you'll fit in either way. Wear whatever you're comfortable in.",
      },
    ] satisfies ExpectBeat[],
    kids: {
      title: "Your kids are in good hands",
      body: "We love having children, and we take their safety and joy seriously. During the service they're cared for by a warm, vetted team in a space made just for them.",
      points: [
        "[Children's church for ages ... during the main service]",
        "[Simple, secure check-in and check-out]",
        "[Where to take them when you arrive]",
      ],
    },
    welcomeVideo: {
      youtubeId: null as string | null,
      label: "[30 to 60 second welcome video showing the room, the worship, the people]",
    },
  },

  /** About page — the deeper "who we are + how we function". [CONFIRM wording with the church] */
  about: {
    intro: [
      "Salem City of Faith is a warm Pentecostal family in Port Harcourt. We're ordinary people from every walk of life, brought together by Jesus and a shared hunger to know God and love our city.",
      "Whoever you are, however you come, you'll find a place to belong here.",
    ],
    /**
     * ONE-LINE SUMMARIES FOR THE HOMEPAGE About section (the trailer).
     * Each is the compressed form of a full /about section — keep them to a
     * sentence. If you change the long version, change the summary with it.
     *   identitySummary  → /about "Who We Are"
     *   heritageSummary  → /about "Our Heritage"
     *   visionSummary    → /about "Our Vision" (the four pillars, in one line)
     *   `missionStatement` below is shared verbatim by both pages — it is a
     *   stated commitment and must not be paraphrased.
     */
    identitySummary:
      "A Christ-centred, Bible-believing family in Port Harcourt. Everything here starts and ends with Jesus.",
    heritageSummary:
      "We grow out of Foundation Faith Church, planted in Port Harcourt in 1988 by Archbishop Sam Amaga and Dr. Love Sam-Amaga.",
    visionSummary:
      "To raise a triumphant people: strong in faith, empowered by wisdom, intimate with the Holy Spirit, and doing exploits for God.",
    // Plain-language beliefs, not a theology dump. [CONFIRM exact wording with leadership.]
    beliefs: [
      {
        title: "The Bible",
        body: "God's living word, and our final authority for faith, life, and everything we do.",
      },
      {
        title: "Jesus Christ",
        body: "God's Son, crucified and risen. He is the centre of everything here, not one theme among many.",
      },
      {
        title: "Salvation",
        body: "A gift received by grace through faith. Never earned, never deserved, and open to anyone who comes.",
      },
      {
        title: "The Holy Spirit",
        body: "Active today: empowering, comforting, and leading God's people. We make room for Him.",
      },
      {
        title: "Prayer",
        body: "We bring everything to God, big and small, and we expect Him to answer.",
      },
      {
        title: "Discipleship",
        body: "Following Jesus is a life, not a decision. We grow together and pass on what we've received.",
      },
    ] satisfies Belief[],
    howWeFunction: {
      intro:
        "We're a volunteer-powered family. Here's how things work week to week, and how you can be part of it.",
      membership: {
        title: "Becoming part of the family",
        body: "[Outline the real membership path. For example: start attending, join a newcomers' class, then get connected to a unit. Confirm the actual steps.]",
      },
      rhythms: {
        title: "Our weekly rhythm",
        body: "Sunday gathering for worship and the word, midweek Bible study, and units that meet through the week. [Confirm details.]",
      },
      // The serving teams (departments) are defined once in `departments` above and reused here.
    },
    // Leadership — real photos + short intros. [CONFIRM names, roles, bios, photos]
    /**
     * ORDER IS INTENTIONAL: the founders lead, then the local church's leaders.
     * It follows the same line the Heritage timeline tells — where this came
     * from, then who carries it here. Renders in array order; do not re-sort.
     *
     * `role: ""` renders nothing — the card simply omits the role line. Use it
     * where a title has not been given, rather than inventing one.
     */
    leadership: [
      {
        name: "Archbishop Sam Amaga",
        role: "Founder, Foundation Faith Church",
        photo: "[Photo of the Archbishop]",
        bio: "Began preaching in 1973 and was commissioned, with Dr. Love Sam-Amaga, to raise an army of believers. Planted Foundation Faith Church in Port Harcourt in 1988, the root Salem City of Faith grows from.",
      },
      {
        name: "Dr. Love Sam-Amaga",
        role: "Co-Founder",
        photo: "[Photo of Dr. Love Sam-Amaga]",
        bio: "Co-carrier of the original commission, and a mother in the faith to a generation of believers across the nations the ministry now reaches. [CONFIRM wording.]",
      },
      {
        name: "Bishop Hilary Ogoliegbune",
        role: "Bishop",
        photo: "[Photo of the Bishop]",
        bio: "Bishop Hilary leads Salem City of Faith with a pastor's heart and a teacher's patience. His burden is simple: that ordinary people become strong in faith, wise in life, and close to the Holy Spirit. [CONFIRM: add years served and a personal line.]",
      },
      {
        name: "Rev. Dr. (Mrs) Ogoliegbune",
        role: "",
        photo: "[Photo of the Pastor's wife]",
        bio: "She serves alongside the Bishop, with a particular heart for women, families, and the campus work.",
      },
    ] satisfies Leader[],
    vision:
      "Our heart is to see a Port Harcourt where everyone has a church family to belong to: a people growing in God, lifting one another, and carrying His love to every corner of our city. [Refine with the church's own vision statement.]",

    /* ---------- About page content (sections in page order) ---------- */

    /** Section 1 — Who we are. Short paragraphs on purpose; this is a phone-first page. */
    whoWeAre: [
      "Salem City of Faith is a Christ-centred, Bible-believing family in Port Harcourt. Everything here starts and ends with Jesus.",
      "We're ordinary people from every walk of life: students, traders, professionals and families, brought together by one hunger to know God.",
      "We take the Bible seriously and each other personally. Faith is grown in community here, not in isolation.",
      "We exist to raise disciples: believers who are established, equipped, and sent out to serve this city well.",
    ],

    /**
     * Section 2 — Heritage. The line we stand in.
     * [CONFIRM dates and wording with church leadership before launch.]
     */
    heritage: {
      intro:
        "Salem City of Faith did not begin in a vacuum. We are one local expression of a work God started decades ago, and the vision we carry today was handed to us.",
      /** The founders' feature panel above the timeline. */
      founders: {
        names: "Archbishop Sam Amaga & Dr. Love Sam-Amaga",
        role: "Founders, Foundation Faith Church",
        body: "In 1984 God called them to raise an army of believers: a people strong in faith, empowered by wisdom, and intimate with the Holy Spirit. Everything Salem City of Faith is today grows out of that commission.",
      },
      timeline: [
        {
          year: "1973",
          title: "The preaching begins",
          body: "Archbishop Sam Amaga starts preaching the gospel, long before there was a church, a building, or a name.",
        },
        {
          year: "1984",
          title: "The commission",
          body: "God calls Archbishop Sam Amaga and Dr. Love Sam-Amaga to raise an army of believers: strong in faith, empowered by wisdom, intimate with the Holy Spirit.",
        },
        {
          year: "1985",
          title: "Full-time ministry",
          body: "The call is answered without reserve. Ministry stops being something done alongside everything else and becomes the whole work.",
        },
        {
          year: "1988",
          title: "Foundation Faith Church",
          body: "The first church is planted in Port Harcourt, on the same soil Salem City of Faith stands on today.",
        },
        {
          year: "1998",
          title: "Salem International Christian Center",
          body: "A decade on, the work is planted in Lagos, and the vision proves it can travel beyond the city it was born in.",
        },
        {
          year: "Onward",
          title: "Global church planting",
          body: "The ministry expands across Africa, into Europe and beyond, congregation after congregation carrying the same commission.",
        },
        {
          year: "Today",
          title: "Salem City of Faith",
          body: "Here in Port Harcourt we continue that same vision, one person at a time.",
        },
      ] satisfies TimelineEntry[],
    },

    /** Section 3 — the four pillars of the vision. */
    visionPillars: [
      {
        title: "Strong in Faith",
        body: "Faith that holds when life is hard, built on the word of God rather than on circumstances or feelings.",
      },
      {
        title: "Empowered by Wisdom",
        body: "Wisdom for real decisions: work, family, money, purpose. God's counsel applied to ordinary Monday mornings.",
      },
      {
        title: "Intimate with the Holy Spirit",
        body: "Not a distant God, but a daily friendship, with the Holy Spirit leading, comforting and empowering as you go.",
      },
      {
        title: "Doing Exploits for God and in Life",
        body: "Faith that shows. People who excel where God has placed them and leave their world better than they found it.",
      },
    ] satisfies Pillar[],

    /** Section 4 — the mission statement, shown large and alone. */
    missionStatement:
      "To establish 300 million disciples in over 150,000 churches around the world by 2055, if Jesus tarries.",
    missionSupport:
      "It is a big number because it is a big commission. Every service, every class and every campus outreach is a step toward it, and every person who says yes counts.",

    /** Section 5 — what drives the work. */
    passion: [
      {
        title: "Winning souls",
        body: "Bringing people to Jesus on campuses, in homes, and across our city.",
      },
      {
        title: "Establishing believers",
        body: "Helping new believers stand on a firm foundation instead of drifting.",
      },
      {
        title: "Making disciples",
        body: "Growing followers of Jesus who can walk it out and pass it on.",
      },
      {
        title: "Equipping leaders",
        body: "Raising people who can carry responsibility and lead others well.",
      },
      {
        title: "Transforming generations",
        body: "Reaching the young, so what God does here outlives all of us.",
      },
    ] satisfies Pillar[],

    /** Section 6 — core values. `icon` keys are resolved in `CoreValues.tsx`. */
    coreValues: [
      {
        title: "Practical Peace & Righteousness",
        body: "Right living that shows up in ordinary conduct. Not performance, but peace you can actually live in.",
        icon: "leaf",
      },
      {
        title: "Faith & Wisdom",
        body: "We believe God and we think clearly. Faith and good sense are partners here, never rivals.",
        icon: "book",
      },
      {
        title: "Intimacy with the Holy Spirit",
        body: "A daily walk with the Spirit: listening, yielding, and being led rather than merely informed.",
        icon: "flame",
      },
      {
        title: "Confidence & Positive Mentality",
        body: "Boldness rooted in who God says you are. We refuse a small, fearful view of life.",
        icon: "sunrise",
      },
      {
        title: "Capacity Building",
        body: "We grow people. Skills, character and gifting are developed on purpose, not left to chance.",
        icon: "growth",
      },
      {
        title: "Integrity",
        body: "The same in private as in public. What we say is what we do, whether or not anyone is watching.",
        icon: "scales",
      },
      {
        title: "Responsibility",
        body: "We own our work, our words and our commitments, to God, to family, and to one another.",
        icon: "shield",
      },
      {
        title: "Diligence",
        body: "Faithful in the small and the unseen. Excellence is a habit here, not an occasion.",
        icon: "target",
      },
      {
        title: "Sacrifice",
        body: "Nothing worth building is free. We give time, resources and comfort for what outlasts us.",
        icon: "gift",
      },
    ] satisfies IconedItem[],

    /**
     * Section 10 — how the local church actually runs, week to week.
     *
     * ⚠️ The `when` lines for Sunday Worship and Midweek restate `serviceTimes`
     * at the top of this file. Change one, change the other.
     *
     * "[to be confirmed]" inside a `when` is deliberate and visitor-facing: the
     * church gave the time but has not yet verified it, and a wrong time on a
     * church website costs someone a wasted trip. Delete the marker once confirmed.
     */
    churchLife: [
      {
        title: "Sunday Worship",
        when: "Sundays, 7:00 AM",
        body: "Our main gathering: heartfelt praise, the word taught plainly, prayer, and time to actually meet people afterwards.",
        icon: "music",
      },
      {
        title: "Midweek Services",
        when: "Wednesdays, 5:30 PM",
        body: "Bible study and prayer in the middle of the week, where the teaching goes deeper, questions are welcome, and there's room to grow.",
        icon: "book",
      },
      {
        title: "Foundation Classes",
        when: "Mondays, 6:00 PM · and Sundays after service",
        body: "Where discipleship starts. A friendly course laying the spiritual foundations of the faith and what it means to belong here. Come to whichever session suits you.",
        icon: "seedling",
      },
      {
        title: "Water Baptism",
        when: "Saturdays, 9:00 AM [to be confirmed]",
        body: "A public step of obedience after believing in Jesus. If you're ready, speak to any leader and we'll walk you through it. No fee, no fuss.",
        icon: "droplet",
      },
      {
        title: "Children's Church",
        when: "During the main service",
        body: "Children are taught the ways of God from a very young age, with separate classes for different age groups so the teaching actually fits them. A warm, vetted team, and a space built for them.",
        icon: "baby",
      },
      {
        title: "Evangelism",
        when: "Mondays, 7:00 AM [to be confirmed]",
        body: "We go out. Every Monday morning we take the gospel into our streets, campuses and neighbourhoods. Anyone can join, and you'll never go alone.",
        icon: "navigation",
      },
      {
        title: "We Care Ministry",
        when: "[Details to be confirmed]",
        body: "[Outline the We Care ministry: who it reaches, what it does, and how someone gets help or joins. Awaiting details from the church.]",
        icon: "heart",
      },
      {
        title: "Ministries & Departments",
        body: "Volunteer teams that carry the work: music, media, ushering, protocol and more. There's a place for you below.",
        icon: "users",
      },
    ] satisfies IconedItem[],

    /** Section 11 — the path from first visit to sent-out believer. */
    journey: [
      { title: "Visit", body: "Come as you are, sit at the back if you like. No pressure." },
      { title: "Know Christ", body: "Meet Jesus for yourself. This is the beginning of everything." },
      { title: "Foundation Class", body: "Learn the basics and get your footing." },
      { title: "Water Baptism", body: "Go public with the decision you've made." },
      { title: "Join a Ministry", body: "Find a team and start serving with others." },
      { title: "Grow in Faith", body: "Go deeper through teaching, prayer and community." },
      { title: "Serve Others", body: "Carry responsibility and help the next person along." },
      { title: "Impact Your World", body: "Take it into your campus, work and family." },
    ] satisfies JourneyStep[],

    /**
     * Section 12 — FAQs.
     * ⚠️ The service-time and location answers restate `serviceTimes` and
     * `address` above. If you change those, change these too.
     */
    faqs: [
      {
        q: "What time are services?",
        a: "Sunday Service starts at 7:00 AM, and Bible Study is on Wednesday at 5:30 PM. Come a few minutes early if you'd like someone to show you around.",
      },
      {
        q: "Where are you located?",
        a: "1 Faith Avenue, Rumuomasi, Port Harcourt, Rivers State. There's a Get Directions link in the footer that opens straight in Google Maps.",
      },
      {
        q: "Is there children's church?",
        a: "Yes. Children are cared for by a warm, vetted team in a space made just for them, running during the main service.",
      },
      {
        q: "What should I wear?",
        a: "Come as you are. Some dress up, many come casual, and you'll fit in either way.",
      },
      {
        q: "Can I visit if I'm not a Christian?",
        a: "Absolutely, and you're genuinely welcome. There's no spotlight on guests, no pressure to stand, speak or give. Come and see.",
      },
      {
        q: "How long is the service?",
        a: "[CONFIRM] About two hours, including worship, the message and prayer.",
      },
      {
        q: "Do you livestream services?",
        a: "Not yet. Our livestream is on the way. For now the best seat is in the room, and the Watch page will carry it as soon as it's live.",
      },
    ] satisfies Faq[],
  },

  /** Testimonies — CLEARED by the church for launch. Carousel on the homepage. */
  /*
   * Real testimonies given by members, replacing the four invented placeholders
   * that used to sit here (they rendered literal "[First name]" text on the page).
   *
   * NO NAMES, ON PURPOSE. None were supplied, and inventing attribution for a
   * real person's medical testimony is not something to guess at. `name` is
   * optional on the type, and `Testimonials.tsx` simply omits the caption when
   * it is absent — so the quote stands on its own. Add a name here once the
   * person has agreed to be identified and the caption appears automatically.
   *
   * Wording is the members' own. Only clear typos and run-on punctuation were
   * corrected: "outporing"->"outpouring", "preservind"->"preserving",
   * "to to God"->"to God", "Arch Bishop Sam-Amaga"->"Archbishop Sam Amaga"
   * (matching the spelling used everywhere else on the site), and two comma
   * splices were made full stops. Nothing was rephrased or shortened.
   */
  testimonials: [
    {
      quote:
        "On December 9, 2024, I felt a sharp pain in my head, collapsed, and was rushed to the hospital. I was diagnosed with a stroke. During our outpouring conference, my husband found me with foam coming out of my mouth and nose, and medical tests revealed I had suffered a stroke caused by a blood clot in my brain. During this year's Covenant Week of Celebration, Archbishop Sam Amaga decreed supernatural provision for all Salemites. I claimed that decree, began praying, and also called my pastor to pray with me through the pain. Afterward, I returned to the hospital for medical analysis. To the glory of God, the test results showed that the blood clot in my brain was completely gone! I bless the God of Salem for my total healing.",
      photo: null,
    },
    {
      quote:
        "I am here to thank God for sustaining me as I travelled across four countries in the last two weeks. The testimony means more to me after I was informed that my colleague who also travelled was found dead. I give all thanks to God for preserving me and my family.",
      photo: null,
    },
    {
      quote:
        "My child was a special child. She was not able to go to school for seven years, but now she has graduated and is about to enter the university. I am here to give God all the glory.",
      photo: null,
    },
  ] satisfies Testimonial[],

  /** Get involved — serving teams. [CONFIRM blurbs, especially KDF] */
  departments: [
    {
      name: "Technical / Media",
      blurb:
        "Sound, cameras, livestream and slides, helping every service reach the room and the world online.",
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
        "Order and hospitality, caring for guests and ministers so every service runs smoothly.",
      photo: "[Protocol team]",
    },
    {
      name: "Kingdom Dominion Force (KDF)",
      blurb:
        "[Describe KDF]. A force for prayer, evangelism and taking the gospel beyond the walls.",
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
        /*
         * The two phone numbers in `blurb` below are SPAMIC's REGISTRAR, taken
         * off the flyer — they are NOT the church's line and must not be swept
         * into `church.phone`. Anyone dialling them is registering for a course.
         * Every church-owned number on the site is one line; these are the
         * deliberate exception because they belong to someone else.
         */
        id: "spamic-batch-2",
        title: "SPAMIC August/September Session (Batch 2)",
        // Not a one-day event — an intake whose classes run every Saturday from
        // the 8th, so `date` carries the start and `time` carries the cadence.
        date: "Classes begin Saturday, 8 August 2026",
        time: "8:00 AM prompt · Saturdays only",
        location:
          "Salem Pastoral & Management College, #1 Faith Avenue, off Stadium Road, Rumuomasi",
        blurb:
          "Admission is open for Batch 2 of the August/September session at Salem Pastoral & Management College — upgrade your leadership skills in 2026. Open to CEOs, MDs, church workers, pastors, company staff, front-line leaders, students, business men and women, and entrepreneurs. Register onsite at the Registrar's office, or call 0816 507 9879 or 0813 849 1000.",
        flyer: "SPAMIC August/September Session (Batch 2) flyer",
      },
      {
        id: "ignite-revival",
        title: "Provincial Youth Conference 2026: Ignite Revival",
        date: "Saturday, 19 September 2026",
        time: "9:00 AM prompt",
        location:
          "#1 Faith Avenue, Rumuomasi, Port Harcourt",
        blurb:
          "Salem Diplomats, Rivers Province, host this year's Provincial Youth Conference under the theme Ignite Revival — Take the Initiative. Convened by Bishop Hilary Ogoliegbune and hosted by Pst. Tony Wilcox, with Rev. Henry Power, Rev. Joseph Sam Odumo, Rev. Chuks Anointed, Pst. Inifie Allaputa and Pst. Ani Udo ministering.",
        flyer: "Ignite Revival: Provincial Youth Conference 2026 flyer",
      },
    ] satisfies ChurchEvent[],
    /*
     * Past events, MOST RECENT FIRST. Real events only — the invented placeholder
     * entries that used to pad this list out have been deleted.
     *
     * Retiring an event is a move, not a delete: keep the SAME `id` when you cut
     * an entry from `upcoming` and paste it here, because `PastEvents.tsx` looks
     * the flyer up in `eventImages` by id exactly the way `UpcomingEvents.tsx`
     * does. Same id → the real flyer keeps showing; change the id and the card
     * silently drops to a placeholder panel.
     *
     * A `PastEvent` has no time/location/blurb, so those fields are dropped in
     * the move — a past card only shows the flyer, the title and the date.
     */
    past: [
      {
        // Moved from `upcoming` once it had run. Same id, so the real flyer
        // follows it across via `eventImages`.
        id: "teens-summit",
        title: "Teens Summit 2026: Dominion",
        date: "30 August 2026",
        photo: "[Teens Summit 2026: Dominion]",
      },
      {
        id: "annual-women-conference",
        title: "Annual Women Conference: Called to Conquer Through Divine Love",
        date: "28 and 29 August 2026",
        photo: "[Annual Women Conference]",
      },
      {
        id: "worship-experience",
        title: "The Worship Experience",
        date: "23 August 2026",
        photo: "[The Worship Experience]",
      },
      {
        // Moved from `upcoming` once the camp finished. Same id, so the real
        // flyer follows it across via `eventImages` — see the note above.
        id: "let-the-fire-fall",
        title: "Let The Fire Fall — 3 Days Prayer Retreat & Camp Meeting",
        date: "12 to 15 August 2026",
        photo: "[Let The Fire Fall camp meeting]",
      },
      {
        id: "q2-thanksgiving",
        title: "2nd Quarter Thanksgiving",
        date: "2 August 2026",
        photo: "[2nd Quarter Thanksgiving service]",
      },
      {
        id: "salem-campus-outreach",
        title: "Salem Campus Outreach: Ignite",
        date: "30 July to 1 August 2026",
        photo: "[Salem Campus Outreach: Ignite]",
      },
      {
        id: "covenant-week",
        title: "Covenant Week of Celebration",
        date: "[1 to 5 July 2026]",
        photo: "[Covenant Week celebration]",
      },
    ] satisfies PastEvent[],
  },

  /**
   * PARKED — NOT RENDERED ANYWHERE. This fed a homepage sermon section that was
   * removed: it was never in the spec (design-system/.../home.md lists 8
   * sections, none a sermon block) and a sermon feature is deferred + gated on
   * church clearance (HANDOFF §8c). The component survives, unimported, at
   * `home/LatestSermon.tsx`.
   *
   * Do NOT fill these placeholders as part of the normal `[BRACKET]` sweep —
   * they are not on the launch checklist (HANDOFF §9). If the church clears a
   * sermon feature, prefer `church.watch.latestServiceId` (HANDOFF §8a) over a
   * second video-id slot here.
   */
  sermons: {
    latest: {
      title: "[Sermon title: the message, not the series]",
      speaker: "[Speaker, e.g. Bishop Hilary Ogoliegbune]",
      date: "[Sunday, 26 July 2026]",
      description:
        "[Two lines on what this message is about, enough that someone who missed Sunday wants to catch up.]",
      /* ⬇️ PASTE THE YOUTUBE VIDEO ID HERE to turn the player on. Nothing else to change. */
      youtubeId: null,
      thumbnail: "[Still from the service, the speaker mid-message]",
      watchHref: "/watch",
    } satisfies Sermon,
    /** Where "Browse all sermons" goes. Repoint at /sermons once that page exists. */
    archiveHref: "/watch",
  },

  /**
   * Prayer — the church's "we'll stand with you" channel. WhatsApp-first like
   * every other contact path on the site (no forms, architecture doc §2).
   */
  prayer: {
    heading: "Need prayer?",
    body: "No matter what you're facing, we'd be honored to stand with you in prayer. Our prayer team is here to support you.",
    whatsappMessage:
      "Hello Salem City of Faith, I'd like to request prayer.",
  },

  /**
   * Classes — the church's three schools, from the "Effective Leader" flyer.
   *
   * These are STANDING SCHOOLS with an annual rhythm, not one-off events, which
   * is why `season` carries months but no year and `year` is separate. Written
   * that way on purpose: copy that says "starts March 2026" is wrong every year
   * from 2027, whereas "runs March to May" stays true and only `year` has to be
   * touched. If a school is ever retired, delete it here — /classes and the
   * homepage preview both read this array and neither hardcodes three.
   *
   * The registrar's phone numbers below are SPAMIC's, NOT the church's line —
   * the same pair that appears in the `spamic-batch-2` event blurb. See the
   * guard comment there. Do not fold them into `church.phone`.
   */
  classes: {
    /** The programme name. (The flyer's own headline reads "The Effective Leader".) */
    theme: "Arch-Bishop's Arm",
    tagline: "Upgrade your leadership skills",
    /** [CONFIRM] The flyer is the 2026 announcement. Update each year. */
    year: "2026",
    /** Verbatim from the flyer's "Open to" line. */
    openTo: [
      "CEOs and MDs",
      "Church workers and pastors",
      "Staff of companies",
      "Front-line leaders",
      "Students",
      "Business men and women",
      "Entrepreneurs",
    ],
    register: {
      how: "Admission is open. Register onsite at the Registrar's office.",
      address:
        "1 Faith Avenue, off Stadium Road, Rumuomasi, Port Harcourt",
      /** SPAMIC's registrar — NOT `church.phone`. See the note above. */
      phones: ["0816 507 9879", "0813 849 1000"],
    },
    /*
     * The institute's own story, supplied by the church. Rendered on /classes
     * directly under the flyer.
     *
     * Two small tidy-ups were made to the supplied text and nothing else:
     * "Sscholarship" -> "Scholarship", and a stray trailing slash after
     * "Salem University of Nigeria" was dropped. Wording is otherwise verbatim.
     */
    institute: {
      /*
       * Which schools to name in the lead-in, and in what order. Ids, not
       * strings — the names themselves live once, on `schools` below, so they
       * cannot drift. The order here is the church's, and differs from the
       * flyer order the cards follow.
       */
      nameOrder: ["cfbi", "spamic", "plt"],
      mandate:
        "The commission mandate God gave to His servant the presiding Archbishop, Dr. Sam Amaga on the 6th of July, 1986, which finally started on the 1st of July 1988: to raise an army of ministry leaders who are strong in faith, empowered by wisdom, intimate with the Holy Spirit, and doing exploits in life and ministry.",
      objective:
        "The school's objective is to train, equip and mobilize the entire labour force to think as global leaders in ministry and the marketplace. Each subject taught at this institute has the potential to stretch you.",
      journey: {
        heading: "The journey so far",
        body: "Our training institute runs campuses in Ghana, Lagos, Abuja and here in Port Harcourt where the journey began. So many great men and women have been raised through this institute for end-time impact.",
      },
      workforce: {
        heading: "The capacity of our workforce",
        body: "We can boast of well-grounded instructors and management staffers.",
        /*
         * The supplied text ended mid-sentence — "…staffers like …" — with no
         * names. Fill this in and ClassList appends it to `body` as "like X, Y
         * and Z." While it is bracketed the sentence simply stops after
         * "staffers", which is true and complete on its own.
         */
        names: "[CONFIRM: names of the instructors and management staff]",
      },
      affiliation: {
        heading: "Our affiliation",
        body: "Our affiliation is with our own university, Salem University of Nigeria.",
      },
      certificates: {
        heading: "Our certificates",
        note: "Awarded by Salem University",
        // "Certificate Applied Theology" as supplied; "in" added to match the
        // other three.
        items: [
          "Certificate in Applied Theology",
          "Diploma (Dip) in Applied Theology",
          "Advanced Diploma (AD) in Practical Ministry",
          "Post Graduate Diploma (PGD) in Ministerial Arts",
        ],
      },
      modules: {
        heading: "Our courses have five modules",
        items: [
          "Ministerial & Christian Life series",
          "Organizational Management & Leadership",
          "Marriage and Home series",
          "Human Resource Management",
          "Leadership series",
        ],
      },
      campusLife: {
        heading: "Life in our campuses",
        items: [
          "Practical ministry development",
          "Student life",
          "Spirit-led instruction",
          "Seasoned instructors",
          "Scholarship",
          "Washrooms",
          "Security",
        ],
      },
    },

    schools: [
      {
        id: "plt",
        acronym: "P.L.T",
        short: "PLT",
        // Resolved: the flyer's "Provincial Leadership School" did not match its
        // own "P.L.T". The church confirmed the name is Provincial Leadership
        // Training, which is what the acronym was always short for.
        name: "Provincial Leadership Training",
        season: "March to May",
        meets: "Thursdays",
        time: "[CONFIRM: the flyer prints only the word TIME]",
        summary:
          "Weekly leadership training for those already carrying responsibility.",
      },
      {
        id: "cfbi",
        acronym: "C.F.B.I",
        short: "CFBI",
        name: "Covenant Faith Bible Institute",
        season: "May to June",
        meets: "Weekends",
        time: "[CONFIRM: the flyer prints only the word TIME]",
        summary:
          "A weekend grounding in Scripture — what you believe, and why.",
      },
      {
        id: "spamic",
        acronym: "S.P.A.M.I.C",
        short: "SPAMIC",
        name: "Salem Pastoral & Management College",
        season: "July to September",
        meets: "Weekends",
        time: "[CONFIRM: the flyer prints only the word TIME]",
        summary:
          "Pastoral ministry and management, for those leading a work.",
      },
    ] satisfies ChurchClass[],
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
    hero: "[Wide, warm photo of the congregation showing faces, joy, real service]",
    glimpse: [
      "[Worship moment]",
      "[People greeting / fellowship]",
      "[Children's church]",
      "[An event or outreach]",
    ],
  },
} as const;

/**
 * Appended to every prefilled WhatsApp message.
 *
 * The church's admins receive messages from unknown numbers with no name
 * attached, so every link asks for one. WhatsApp drops the cursor at the END of
 * a prefilled message, which is why this ends on "My name is: " — the caret
 * lands exactly where the visitor should type.
 *
 * The trailing space is deliberate. Do not trim it.
 */
const NAME_PROMPT = "\n\nMy name is: ";

/**
 * Build a WhatsApp deep link with an optional prefilled message.
 *
 * THIS IS THE ONLY PLACE IN THE CODEBASE THAT BUILDS A wa.me URL — every
 * WhatsApp link on every page routes through it. Keep it that way: it is why
 * the name prompt could be added in one edit instead of fifteen.
 *
 * NOTE what this does and does not do. A wa.me link PREFILLS WhatsApp's
 * composer; it does not send. The visitor still taps send inside WhatsApp.
 * Sending from the site itself would need the WhatsApp Business Cloud API (Meta
 * verification, a dedicated number that can no longer be used in the normal
 * app, a server — this site is fully static — and per-conversation cost). So do
 * not wire this up behind anything labelled "Send": a button that claims to
 * send and only opens a draft loses messages silently.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${church.whatsappNumber}`;
  // Only when there IS a message. A bare link is deliberately context-free, and
  // a lone "My name is:" with nothing above it reads like a broken template.
  return message
    ? `${base}?text=${encodeURIComponent(message + NAME_PROMPT)}`
    : base;
}

/**
 * Primary nav. Newcomers go to About for the full picture of the church; the
 * Plan Your Visit button is the only link to /visit. Contact lives in the footer.
 */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  // [CONFIRM] Label may change — the church has not settled on "Classes".
  { href: "/classes", label: "Classes" },
  { href: "/watch", label: "Watch" },
] as const;

/** The single destination almost every CTA points to. */
export const PLAN_VISIT_HREF = "/visit";
