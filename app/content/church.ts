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
    /**
     * Short mission / vision / culture lines for the homepage About section.
     * Kept to one sentence each on purpose — the homepage is the trailer, the
     * About page is the full picture.
     */
    mission:
      "[CONFIRM] To raise a triumphant people — strong in faith, empowered by wisdom, and intimate with the Holy Spirit.",
    culture:
      "[CONFIRM] Warm, real and family-first. Come as you are, and you'll be met by people who are glad you did.",
    // Plain-language beliefs, not a theology dump. [CONFIRM exact wording with leadership.]
    beliefs: [
      {
        title: "The Bible",
        body: "God's living word — our final authority for faith, life, and everything we do.",
      },
      {
        title: "Jesus Christ",
        body: "God's Son, crucified and risen. He is the centre of everything here, not one theme among many.",
      },
      {
        title: "Salvation",
        body: "A gift received by grace through faith — never earned, never deserved, and open to anyone who comes.",
      },
      {
        title: "The Holy Spirit",
        body: "Active today: empowering, comforting, and leading God's people. We make room for Him.",
      },
      {
        title: "Prayer",
        body: "We bring everything to God, big and small — and we expect Him to answer.",
      },
      {
        title: "Discipleship",
        body: "Following Jesus is a life, not a decision. We grow together and pass on what we've received.",
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
        role: "Lead Pastor",
        photo: "[Photo of the Bishop]",
        bio: "Bishop Hilary leads Salem Rivers with a pastor's heart and a teacher's patience. His burden is simple: that ordinary people become strong in faith, wise in life, and close to the Holy Spirit. [CONFIRM — add years served and a personal line.]",
      },
      {
        name: "Rev. Dr. (Mrs) Ogoliegbune",
        role: "Pastor's Wife",
        photo: "[Photo of the Pastor's wife]",
        bio: "[CONFIRM full name.] She serves alongside the Bishop, with a particular heart for women, families, and the campus work. [Add a warm two-line introduction.]",
      },
      {
        name: "Archbishop Sam Amaga",
        role: "Founder, Foundation Faith Church",
        photo: "[Photo of the Archbishop]",
        bio: "Began preaching in 1973 and was commissioned, with Dr. Love Sam-Amaga, to raise an army of believers. Planted Foundation Faith Church in Port Harcourt in 1988 — the root Salem Rivers grows from.",
      },
      {
        name: "Dr. Love Sam-Amaga",
        role: "Co-Founder",
        photo: "[Photo of Dr. Love Sam-Amaga]",
        bio: "Co-carrier of the original commission, and a mother in the faith to a generation of believers across the nations the ministry now reaches. [CONFIRM wording.]",
      },
    ] satisfies Leader[],
    vision:
      "Our heart is to see a Port Harcourt where everyone has a church family to belong to — a people growing in God, lifting one another, and carrying His love to every corner of our city. [Refine with the church's own vision statement.]",

    /* ---------- About page content (sections in page order) ---------- */

    /** Section 1 — Who we are. Short paragraphs on purpose; this is a phone-first page. */
    whoWeAre: [
      "Salem Rivers is a Christ-centred, Bible-believing family in Port Harcourt. Everything here starts and ends with Jesus.",
      "We're ordinary people from every walk of life — students, traders, professionals, families — brought together by one hunger to know God.",
      "We take the Bible seriously and each other personally. Faith is grown in community here, not in isolation.",
      "We exist to raise disciples: believers who are established, equipped, and sent out to serve this city well.",
    ],

    /**
     * Section 2 — Heritage. The line we stand in.
     * [CONFIRM dates and wording with church leadership before launch.]
     */
    heritage: {
      intro:
        "Salem Rivers did not begin in a vacuum. We are one local expression of a work God started decades ago, and the vision we carry today was handed to us.",
      /** The founders' feature panel above the timeline. */
      founders: {
        names: "Archbishop Sam Amaga & Dr. Love Sam-Amaga",
        role: "Founders, Foundation Faith Church",
        body: "In 1984 God called them to raise an army of believers — a people strong in faith, empowered by wisdom, and intimate with the Holy Spirit. Everything Salem Rivers is today grows out of that commission.",
      },
      timeline: [
        {
          year: "1973",
          title: "The preaching begins",
          body: "Archbishop Sam Amaga starts preaching the gospel — long before there was a church, a building, or a name.",
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
          body: "The first church is planted in Port Harcourt — the same soil Salem Rivers stands on today.",
        },
        {
          year: "1998",
          title: "Salem International Christian Center",
          body: "A decade on, the work is planted in Lagos, and the vision proves it can travel beyond the city it was born in.",
        },
        {
          year: "Onward",
          title: "Global church planting",
          body: "The ministry expands across Africa, into Europe and beyond — congregation after congregation carrying the same commission.",
        },
        {
          year: "Today",
          title: "Salem Rivers",
          body: "Here in Port Harcourt we continue that same vision, one person at a time.",
        },
      ] satisfies TimelineEntry[],
    },

    /** Section 3 — the four pillars of the vision. */
    visionPillars: [
      {
        title: "Strong in Faith",
        body: "Faith that holds when life is hard — built on the word of God rather than on circumstances or feelings.",
      },
      {
        title: "Empowered by Wisdom",
        body: "Wisdom for real decisions: work, family, money, purpose. God's counsel applied to ordinary Monday mornings.",
      },
      {
        title: "Intimate with the Holy Spirit",
        body: "Not a distant God, but a daily friendship — the Holy Spirit leading, comforting and empowering as you go.",
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
      "It is a big number because it is a big commission. Every service, every class and every campus outreach is a step toward it — and every person who says yes counts.",

    /** Section 5 — what drives the work. */
    passion: [
      {
        title: "Winning souls",
        body: "Bringing people to Jesus — on campuses, in homes, and across our city.",
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
        body: "Right living that shows up in ordinary conduct — not performance, but peace you can actually live in.",
        icon: "leaf",
      },
      {
        title: "Faith & Wisdom",
        body: "We believe God and we think clearly. Faith and good sense are partners here, never rivals.",
        icon: "book",
      },
      {
        title: "Intimacy with the Holy Spirit",
        body: "A daily walk with the Spirit — listening, yielding, and being led rather than merely informed.",
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
        body: "We own our work, our words and our commitments — to God, to family, and to one another.",
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
        body: "Bible study and prayer in the middle of the week — where the teaching goes deeper, questions are welcome, and there's room to grow.",
        icon: "book",
      },
      {
        title: "Foundation Classes",
        when: "Mondays, 6:00 PM · and Sundays after service",
        body: "Where discipleship starts. A friendly course laying the spiritual foundations of the faith and what it means to belong here — come to whichever session suits you.",
        icon: "seedling",
      },
      {
        title: "Water Baptism",
        when: "Saturdays, 9:00 AM [to be confirmed]",
        body: "A public step of obedience after believing in Jesus. If you're ready, speak to any leader and we'll walk you through it — no fee, no fuss.",
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
        body: "We go out. Every Monday morning we take the gospel into our streets, campuses and neighbourhoods — anyone can join, and you'll never go alone.",
        icon: "navigation",
      },
      {
        title: "We Care Ministry",
        when: "[Details to be confirmed]",
        body: "[Outline the We Care ministry — who it reaches, what it does, and how someone gets help or joins. Awaiting details from the church.]",
        icon: "heart",
      },
      {
        title: "Ministries & Departments",
        body: "Volunteer teams that carry the work — music, media, ushering, protocol and more. There's a place for you below.",
        icon: "users",
      },
    ] satisfies IconedItem[],

    /** Section 11 — the path from first visit to sent-out believer. */
    journey: [
      { title: "Visit", body: "Come as you are, sit at the back if you like. No pressure." },
      { title: "Know Christ", body: "Meet Jesus for yourself — the beginning of everything." },
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
        a: "Come as you are. Some dress up, many come casual — you'll fit in either way.",
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
        a: "Not yet — our livestream is on the way. For now the best seat is in the room, and the Watch page will carry it as soon as it's live.",
      },
    ] satisfies Faq[],
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
        id: "salem-campus-outreach",
        title: "Salem Campus Outreach — Ignite",
        date: "Thursday 30 July – Saturday 1 August 2026",
        // Two different start times across the three days, so this field carries
        // both rather than hiding one. Same for `location` below — two venues.
        time: "Thu & Fri 4:30 PM · Sat 9:00 AM",
        location:
          "Ignatius Ajuru University of Education — ICT Centre (Thu & Fri) · Science Village Auditorium (Sat)",
        blurb:
          "Three days on campus under the theme Ignite — Youths on Fire. Worship and Wonders, the Street Wise Campaign, and Faith Dynamite Voice, with the Grand Outreach closing it on Saturday morning. Free welfare materials for the first 500 students.",
        flyer: "Salem Campus Outreach — Ignite flyer",
      },
      {
        id: "q2-thanksgiving",
        title: "2nd Quarter Thanksgiving",
        date: "Sunday, 2 August 2026",
        time: "7:00 AM",
        location: "Church Auditorium, #1 Faith Avenue, Rumuomasi",
        blurb:
          "A morning of praise and gratitude as we mark the second quarter together. Come and rejoice with us.",
        flyer: "2nd Quarter Thanksgiving flyer",
      },
    ] satisfies ChurchEvent[],
    /*
     * Past events. Real events only — the invented placeholder entries that used
     * to pad this list out have been deleted. Covenant Week keeps its real flyer:
     * `PastEvents.tsx` now looks the image up in `eventImages` by id, the same
     * way `UpcomingEvents.tsx` does, and only falls back to a placeholder panel
     * when no image is mapped.
     */
    past: [
      {
        id: "covenant-week",
        title: "Covenant Week of Celebration",
        date: "[1–5 July 2026]",
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
      title: "[Sermon title — the message, not the series]",
      speaker: "[Speaker — e.g. Bishop Hilary Ogoliegbune]",
      date: "[Sunday, 26 July 2026]",
      description:
        "[Two lines on what this message is about — enough that someone who missed Sunday wants to catch up.]",
      /* ⬇️ PASTE THE YOUTUBE VIDEO ID HERE to turn the player on. Nothing else to change. */
      youtubeId: null,
      thumbnail: "[Still from the service — the speaker mid-message]",
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
      "Hello Salem Rivers — I'd like to request prayer.",
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
