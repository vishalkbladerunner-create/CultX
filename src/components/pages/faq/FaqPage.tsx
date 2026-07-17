import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { FaqList } from "@/components/home/FaqList";
import kit from "@/components/kit/kit.module.css";
import styles from "./FaqPage.module.css";

/*
 * Answers: transcribed verbatim from
 * cult/content-strategy/09-faq-cta-waitlist.md (groups A–G).
 */
const FAQ_GROUPS: {
  id: string;
  title: string;
  items: { q: string; a: string }[];
}[] = [
  {
    id: "a",
    title: "Product basics",
    items: [
      {
        q: "What is CultX?",
        a: "CultX is the all-in-one platform for AI-native IP creation and monetization. Creators build characters, stories, and worlds; publish across major AI entertainment formats; grow audiences; engage communities; and earn. Fans watch, engage, and can own a stake in the legends they love.",
      },
      {
        q: "What does “Where IPs Become Legends” mean?",
        a: "It means IP is not disposable content. On CultX, characters and stories are built to travel across formats, communities, and real-world products — with a path to cultural scale.",
      },
      {
        q: "Who is CultX for?",
        a: "Creators (AI, webtoon, character, series), fans who want deeper ownership and engagement, and IP partners who want production + fan economy. One ecosystem.",
      },
      {
        q: "Is CultX a streaming app, a creator tool, or a crypto app?",
        a: "It’s a unified entertainment platform with creation tools, multi-format publishing, community, and CultX monetization (including crypto rewards and IP tokens). Think entertainment-first, with ownership built in.",
      },
    ],
  },
  {
    id: "b",
    title: "Creation formats",
    items: [
      {
        q: "What can I create on CultX?",
        a: "Four entertainment experiences: 1) AI Comic / Webtoon — finished webtoons to premium AI comic animation; 2) AI Star IP Universe — iconic characters with studio-grade AI production; 3) AI Short — viral short-form for social platforms; 4) AI Drama — cinematic long-form series with K-drama emotion.",
      },
      {
        q: "Why start from webtoon?",
        a: "A finished webtoon already has characters, story, and art. That foundation lets production skip months of greenfield development and move into animation faster — Korea’s webtoon culture is a massive head start.",
      },
      {
        q: "Do I need to use all four formats?",
        a: "No. Start where your story is strongest. The platform is designed so one IP can expand across formats over time.",
      },
    ],
  },
  {
    id: "c",
    title: "Monetization",
    items: [
      {
        q: "How do creators earn on CultX?",
        a: "In three primary ways: 1) Direct sales — sell characters, comics, stories; fans unlock paid content; 2) Community IP tokens — launch a token for a character/IP; fans support, trade, grow together; 3) Ad revenue — earn from attention when users watch ads on content. Rewards can include crypto in the ecosystem vision.",
      },
      {
        q: "How does monetization work on CultX?",
        a: "CultX turns AI creations into income through sales, community ownership, and attention revenue — with crypto rewards in the ecosystem vision. One platform for create, publish, grow, and earn.",
      },
      {
        q: "Are IP tokens investments?",
        a: "IP tokens can involve significant risk and volatility. Nothing on the CultX marketing site is financial advice. Illustrative prices and charts are mocks, not promises of profit.",
      },
      {
        q: "What about USDT cards, robots, and merch?",
        a: "They’re part of the real-world CultX ecosystem vision: collectible IP USDT cards, smart IP robots, and merchandise so fans can live with characters beyond the screen.",
      },
    ],
  },
  {
    id: "d",
    title: "Star IPs & partners",
    items: [
      {
        q: "Which star IPs are featured?",
        a: "From the product deck: Pucca, B.Duck, Ponke, and Mew. Partnerships and brand use are subject to licensing and approval.",
      },
      {
        q: "Can my brand partner with CultX?",
        a: "Yes — use Partner With Us. We’re building a universe for iconic and emerging IPs with production ambition and community economics.",
      },
    ],
  },
  {
    id: "e",
    title: "Place & team",
    items: [
      {
        q: "Where is CultX based?",
        a: "The CultX AI Center is in Gangnam, Seoul — a creator-first hub of roughly 300 specialists.",
      },
      {
        q: "What is the Nonce connection?",
        a: "CultX culture is inspired by Nonce community culture (co-living, co-working, creator-first). The deck describes continuity of team spirit and community values. Exact corporate claims should follow client-approved wording.",
      },
      {
        q: "Is CultX only for Korea?",
        a: "Built in Korea, powered for the world. K-culture craft with global distribution ambition.",
      },
    ],
  },
  {
    id: "f",
    title: "Status & access",
    items: [
      {
        q: "Is the product live?",
        a: "The platform is in active build per the public roadmap vision. The waitlist is the path to early updates and access.",
      },
      {
        q: "What’s on the roadmap?",
        a: "High-level milestones include product build and launch, verified AI creators, large user targets, real-world product sales, and a major-exchange listing application trajectory. Dates are plans, not guarantees — see About/Roadmap.",
      },
      {
        q: "Will there be a $CULTX token listing?",
        a: "The deck includes a listing application milestone. That is a planned trajectory, not a confirmed listing. Do not treat marketing pages as exchange announcements.",
      },
    ],
  },
  {
    id: "g",
    title: "Practical",
    items: [
      {
        q: "What languages will the site support?",
        a: "English-first for v1. Korean (and others) may follow — TBD with client.",
      },
      {
        q: "How do I contact you?",
        a: "Waitlist for updates. Partner form/email for IP and brand inquiries (wire when CRM is ready).",
      },
    ],
  },
];

export function FaqPage() {
  return (
    <main className={styles.main} id="top">
      {/* 1. HERO — no media slot: type-led page */}
      <PageHero
        eyebrow="FAQ"
        title="Straight answers."
        blurb="What CultX is, what you can create, how creators earn, and where we’re building from."
        primary={{ href: "#waitlist", label: "Join the Waitlist" }}
        secondary={{ href: "/", label: "Back to Home" }}
      />

      {/* 2. GROUPED ACCORDION — single content section (short page) */}
      <section className={styles.section} data-theme-section="dark">
        <div className={kit.layout}>
          <SectionHeading
            eyebrow="01 — Common questions"
            title="Everything you need to know to start."
          />
          <div className={styles.groups}>
            {FAQ_GROUPS.map((g) => (
              <div key={g.id} data-reveal>
                <p className={styles.groupTitle}>{g.title}</p>
                <FaqList items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <SiteFooter />
    </main>
  );
}
