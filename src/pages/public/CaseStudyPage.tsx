import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/animations/Reveal";

/* ============================================================
   HACKBASE — MANUAL CASE STUDIES
   No Firebase/database dependency.
   Public case-study content is intentionally static for now.
   ============================================================ */

type CaseStudy = {
  number: string;
  name: string;
  slug: string;
  industry: string;
  type: string;
  year: string;
  clientLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  intro: string;
  challenge: {
    heading: string;
    body: string;
    points: string[];
  };
  approach: {
    heading: string;
    body: string;
  };
  solution: {
    heading: string;
    body: string;
    items: {
      number: string;
      title: string;
      body: string;
    }[];
  };
  system: {
    heading: string;
    body: string;
    items: string[];
  };
  outcome: {
    heading: string;
    body: string;
  };
  capabilities: string[];
  gallery?: {
    image: string;
    alt: string;
    label: string;
  }[];
};

/* ============================================================
   IMAGE SOURCES
   Replace these env values with your final Cloudinary URLs.
   ============================================================ */

const image = {
  sargam:
    import.meta.env.VITE_SARGAM_COVER_IMAGE ||
    "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110622/Screenshot_2026-09-11_123930.png",

  pulsecare:
    import.meta.env.VITE_PULSECARE_COVER_IMAGE ||
    "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110694/Screenshot_2026-09-11_124114.png",

  pharmorite:
    import.meta.env.VITE_PHARMORITE_COVER_IMAGE ||
    "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110303/Screenshot_2026-09-11_123429.png",

  sargamGallery:
    import.meta.env.VITE_SARGAM_GALLERY_IMAGE || "",

  pulsecareGallery:
    import.meta.env.VITE_PULSECARE_GALLERY_IMAGE || "",

  pharmoriteGallery:
    import.meta.env.VITE_PHARMORITE_GALLERY_IMAGE || "",
};

/* ============================================================
   CASE STUDY CONTENT
   ============================================================ */

const caseStudies: Record<string, CaseStudy> = {
  "sargam-healthcare": {
    number: "01",
    name: "Sargam Healthcare",
    slug: "sargam-healthcare",
    industry: "Healthcare",
    type: "Digital Infrastructure",
    year: "2026",
    clientLabel: "Sargam Healthcare",
    eyebrow: "Healthcare · Digital Infrastructure",

    title:
      "Building the digital foundation behind a modern healthcare operation.",

    description:
      "Sargam Healthcare needed more than a website. HackBase designed and built a connected digital foundation for its web presence, patient operations, structured data and future business workflows.",

    heroImage: image.sargam,

    intro:
      "The objective was not to add another isolated software tool. It was to create a reliable digital layer around the way the healthcare operation actually works — making information easier to capture, manage and turn into useful business intelligence.",

    challenge: {
      heading: "The challenge",
      body:
        "Healthcare operations can become difficult to manage when patient information, admission and exit details, communication and reporting live across disconnected processes. Sargam Healthcare needed a more structured digital foundation without introducing unnecessary operational complexity.",

      points: [
        "Patient information needed a consistent digital workflow.",
        "Admission and exit activity needed to be captured in a structured way.",
        "Operational data needed to become useful for reporting and decision-making.",
        "The public-facing website needed to establish trust while supporting the business.",
      ],
    },

    approach: {
      heading: "Infrastructure before features.",
      body:
        "HackBase approached Sargam Healthcare as an infrastructure problem rather than a conventional website project. We looked at the visible customer experience and the operational system underneath it as one connected product. That led to a foundation where the website, patient workflow and data layer could evolve together.",
    },

    solution: {
      heading: "What we built",
      body:
        "The result is a practical digital system designed around the organization's current workflow while leaving room for additional automation, analytics and products later.",

      items: [
        {
          number: "01",
          title: "Digital Experience",
          body:
            "A premium healthcare web presence focused on trust, clarity, information hierarchy and a professional digital experience.",
        },
        {
          number: "02",
          title: "Patient Operations",
          body:
            "A structured patient-entry workflow for capturing core information including name, contact details, date and operational timing.",
        },
        {
          number: "03",
          title: "Data & Reporting",
          body:
            "Patient and operational records are structured so the business can search information and build monthly operational and revenue reporting.",
        },
        {
          number: "04",
          title: "Admin Infrastructure",
          body:
            "A controlled management layer designed to keep operational data organized and accessible to authorized users.",
        },
      ],
    },

    system: {
      heading: "From individual records to operational intelligence.",
      body:
        "The important shift was moving from isolated data entry toward a repeatable system. Information is captured once, stored in a structured form and made available for the next operational decision.",

      items: [
        "Structured patient records",
        "Searchable operational information",
        "Admission and exit time tracking",
        "Monthly reporting foundation",
        "Revenue-oriented data structure",
        "Extensible Firebase / Firestore architecture",
      ],
    },

    outcome: {
      heading: "A stronger digital foundation for growth.",
      body:
        "Sargam Healthcare now has a digital foundation designed around its real operational requirements — combining a professional digital presence with structured patient workflows and a data layer that can support future automation and analytics.",
    },

    capabilities: [
      "Product Strategy",
      "UX / UI Design",
      "Web Development",
      "Firebase",
      "Firestore",
      "Database Architecture",
      "Operations Systems",
      "Digital Infrastructure",
    ],

    gallery: image.sargamGallery
      ? [
          {
            image: image.sargamGallery,
            alt: "Sargam Healthcare digital system",
            label: "System interface",
          },
        ]
      : [],
  },

  pulsecare: {
    number: "02",
    name: "PulseCare",
    slug: "pulsecare",
    industry: "Healthcare",
    type: "Digital Product",
    year: "2026",
    clientLabel: "PulseCare",
    eyebrow: "Healthcare · Product Development",

    title:
      "Turning a healthcare vision into a focused digital product experience.",

    description:
      "PulseCare is a healthcare-focused venture being shaped across products and digital technology. HackBase approached the work as a product-building problem — connecting user experience, structured workflows and the technology underneath.",

    heroImage: image.pulsecare,

    intro:
      "The opportunity was bigger than creating a polished interface. PulseCare needed a digital foundation capable of connecting the user journey with the operational needs of a healthcare business.",

    challenge: {
      heading: "The challenge",
      body:
        "Healthcare products have to balance two very different requirements: the experience needs to feel simple for users, while the system underneath needs to be structured enough for the business to operate reliably.",

      points: [
        "The digital experience needed to communicate healthcare services clearly.",
        "Important user actions needed to be simple and conversion-focused.",
        "Incoming information needed a structured operational path.",
        "The product foundation needed to remain flexible for future expansion.",
      ],
    },

    approach: {
      heading: "Design the journey. Then build the system.",
      body:
        "HackBase worked from the complete journey rather than individual screens. We considered how a user discovers the product, understands the offering, decides to take action and enters the operational workflow. The technology was then structured around that journey.",
    },

    solution: {
      heading: "What we built",
      body:
        "PulseCare was treated as a connected digital product rather than a collection of pages. The experience and underlying workflows were designed to work together.",

      items: [
        {
          number: "01",
          title: "Product Experience",
          body:
            "A clean healthcare-focused experience designed around clarity, trust and a strong visual hierarchy.",
        },
        {
          number: "02",
          title: "User Journey",
          body:
            "A structured journey that reduces friction between discovering a service and taking the next meaningful action.",
        },
        {
          number: "03",
          title: "Structured Capture",
          body:
            "Digital interactions are designed to turn user input into structured information that can support the operational side of the business.",
        },
        {
          number: "04",
          title: "Product Foundation",
          body:
            "A flexible technical foundation that can evolve as PulseCare expands its healthcare products and digital offerings.",
        },
      ],
    },

    system: {
      heading: "A product layer connecting people, information and operations.",
      body:
        "The core principle was simple: every important interaction should have a purpose. The interface creates clarity for the user while the underlying system creates structure for the team.",

      items: [
        "Clear healthcare information architecture",
        "Conversion-focused user journeys",
        "Structured form and lead capture",
        "Operational data flow",
        "Firebase-backed product infrastructure",
        "Foundation for future healthcare products",
      ],
    },

    outcome: {
      heading: "A product foundation built to move beyond the first version.",
      body:
        "PulseCare now has a stronger digital product foundation from which its healthcare-focused offerings can continue to evolve. The work connects product thinking with technology instead of treating them as separate disciplines.",
    },

    capabilities: [
      "Product Strategy",
      "Product Design",
      "UX / UI",
      "React",
      "Firebase",
      "Firestore",
      "Workflow Design",
      "Web Development",
    ],

    gallery: image.pulsecareGallery
      ? [
          {
            image: image.pulsecareGallery,
            alt: "PulseCare digital product",
            label: "Product experience",
          },
        ]
      : [],
  },

  pharmorite: {
    number: "03",
    name: "Pharmorite",
    slug: "pharmorite",
    industry: "Healthcare",
    type: "Digital Product",
    year: "2026",
    clientLabel: "Pharmorite",
    eyebrow: "Healthcare · Digital Product",

    title:
      "Creating a more structured digital layer for a healthcare product.",

    description:
      "Pharmorite is part of HackBase's healthcare product work, focused on creating a clearer digital experience and a technology foundation that can support the product as it develops.",

    heroImage: image.pharmorite,

    intro:
      "The product opportunity was approached from both sides of the experience: what the user sees and what the business needs underneath it. The result is a foundation designed to make the digital journey clearer, more structured and easier to extend.",

    challenge: {
      heading: "The challenge",
      body:
        "Healthcare products become difficult to scale when the experience, business workflow and technology foundation are designed independently. Pharmorite needed a digital approach that could keep these layers connected.",

      points: [
        "Create a clearer and more credible digital experience.",
        "Reduce unnecessary friction across the product journey.",
        "Give the business a structured digital workflow.",
        "Build with enough flexibility for future product requirements.",
      ],
    },

    approach: {
      heading: "A product system, not just a product interface.",
      body:
        "HackBase focused on the relationship between experience, information and operations. Instead of optimizing individual screens in isolation, the work considered how each interaction contributes to the larger product journey and how the system can support future requirements.",
    },

    solution: {
      heading: "What we built",
      body:
        "The work was structured around the foundations that make a healthcare digital product useful, credible and extensible.",

      items: [
        {
          number: "01",
          title: "Digital Experience",
          body:
            "A refined interface designed to communicate the product clearly while maintaining a premium healthcare aesthetic.",
        },
        {
          number: "02",
          title: "Information Architecture",
          body:
            "Content and interactions organized around user intent so important information is easier to understand and act on.",
        },
        {
          number: "03",
          title: "Workflow Foundation",
          body:
            "Digital interactions structured so the business can work with information beyond the initial user session.",
        },
        {
          number: "04",
          title: "Scalable Architecture",
          body:
            "A technology foundation designed to accommodate additional product capabilities as the business evolves.",
        },
      ],
    },

    system: {
      heading: "Make complexity invisible.",
      body:
        "The product philosophy was to keep the visible experience simple while allowing the underlying system to carry the operational complexity.",

      items: [
        "Clear product hierarchy",
        "Healthcare-first UX principles",
        "Structured digital workflows",
        "Scalable application foundation",
        "Business-oriented product thinking",
        "Future-ready architecture",
      ],
    },

    outcome: {
      heading: "A stronger base for the product's next chapter.",
      body:
        "Pharmorite's digital foundation is designed to support continued product development without compromising the simplicity of the user experience. It reflects HackBase's broader approach: understand the business, design the journey and build the system around it.",
    },

    capabilities: [
      "Product Strategy",
      "UX / UI Design",
      "Digital Product Development",
      "Web Development",
      "Workflow Design",
      "System Architecture",
    ],

    gallery: image.pharmoriteGallery
      ? [
          {
            image: image.pharmoriteGallery,
            alt: "Pharmorite digital product",
            label: "Product interface",
          },
        ]
      : [],
  },
};

/* ============================================================
   CASE STUDY PAGE
   ============================================================ */

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? caseStudies[slug] : undefined;

  if (!study) {
    return (
      <PublicLayout>
        <SEO
          title="Case Study Not Found | HackBase"
          description="The requested HackBase case study could not be found."
          canonicalPath="/work"
        />

        <section className="case-not-found">
          <div className="container">
            <Reveal>
              <span className="case-kicker">404 · Case study</span>
              <h1>We couldn't find that project.</h1>
              <p>
                The case study may have moved, or the URL may be incorrect.
              </p>

              <Link to="/work" className="case-back-button">
                <ArrowLeft size={15} />
                Back to selected work
              </Link>
            </Reveal>
          </div>
        </section>

        <CaseStudyStyles />
      </PublicLayout>
    );
  }

  const caseStudyKeys = Object.keys(caseStudies);
  const currentIndex = caseStudyKeys.indexOf(study.slug);
  const nextStudy =
    caseStudies[caseStudyKeys[(currentIndex + 1) % caseStudyKeys.length]];

  const canonicalPath = `/casestudy/${study.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: study.heroImage,
    datePublished: `${study.year}-01-01`,
    author: {
      "@type": "Organization",
      name: "HackBase",
    },
    publisher: {
      "@type": "Organization",
      name: "HackBase",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalPath,
    },
  };

  return (
    <PublicLayout>
      <SEO
        title={`${study.name} — ${study.type} Case Study | HackBase`}
        description={study.description}
        canonicalPath={canonicalPath}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="case-hero">
        <div className="container">
          <Reveal>
            <div className="case-hero-nav">
              <Link to="/work" className="case-back">
                <ArrowLeft size={14} />
                <span>Selected work</span>
              </Link>

              <span className="case-index">
                {study.number} / {String(caseStudyKeys.length).padStart(2, "0")}
              </span>
            </div>

            <div className="case-hero-top">
              <div className="case-hero-meta">
                <span>{study.industry}</span>
                <i />
                <span>{study.type}</span>
                <i />
                <span>{study.year}</span>
              </div>

              <span className="case-client">{study.clientLabel}</span>
            </div>

            <div className="case-title-wrap">
              <p className="case-kicker">{study.eyebrow}</p>

              <h1>{study.title}</h1>

              <p className="case-lead">{study.description}</p>
            </div>

            <div className="case-hero-image">
              <img
                src={study.heroImage}
                alt={`${study.name} — HackBase case study`}
              />

              <div className="case-image-treatment" />

              <div className="case-image-bottom">
                <span>Case study</span>
                <span>{study.name}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          INTRO / SNAPSHOT
      ======================================================== */}

      <section className="case-intro">
        <div className="container">
          <Reveal>
            <div className="case-intro-grid">
              <div>
                <span className="case-section-label">The brief</span>
              </div>

              <div>
                <p className="case-intro-text">{study.intro}</p>

                <div className="case-snapshot">
                  <div>
                    <span>Client</span>
                    <strong>{study.clientLabel}</strong>
                  </div>

                  <div>
                    <span>Industry</span>
                    <strong>{study.industry}</strong>
                  </div>

                  <div>
                    <span>Engagement</span>
                    <strong>{study.type}</strong>
                  </div>

                  <div>
                    <span>Year</span>
                    <strong>{study.year}</strong>
                  </div>
                </div>

                <div className="case-capabilities">
                  {study.capabilities.map((capability) => (
                    <span key={capability}>{capability}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          CHALLENGE
      ======================================================== */}

      <section className="case-block">
        <div className="container">
          <Reveal>
            <div className="case-two-column">
              <div>
                <span className="case-section-label">01 · Problem</span>

                <h2>{study.challenge.heading}</h2>
              </div>

              <div>
                <p className="case-body-large">{study.challenge.body}</p>

                <div className="case-points">
                  {study.challenge.points.map((point) => (
                    <div className="case-point" key={point}>
                      <Check size={14} strokeWidth={1.5} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          APPROACH
      ======================================================== */}

      <section className="case-approach">
        <div className="container">
          <Reveal>
            <div className="approach-layout">
              <div className="approach-number">02</div>

              <div>
                <span className="case-section-label">Our thinking</span>

                <h2>{study.approach.heading}</h2>

                <p>{study.approach.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          SOLUTION
      ======================================================== */}

      <section className="case-solutions">
        <div className="container">
          <Reveal>
            <div className="case-solution-heading">
              <div>
                <span className="case-section-label">03 · Delivery</span>
                <h2>{study.solution.heading}</h2>
              </div>

              <p>{study.solution.body}</p>
            </div>
          </Reveal>

          <div className="solution-grid">
            {study.solution.items.map((item, index) => (
              <Reveal
                key={item.number}
                delay={Math.min(index * 0.06, 0.2)}
              >
                <article className="solution-card">
                  <span className="solution-number">{item.number}</span>

                  <ArrowUpRight
                    className="solution-arrow"
                    size={18}
                    strokeWidth={1.4}
                  />

                  <div className="solution-card-content">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          OPTIONAL GALLERY
      ======================================================== */}

      {study.gallery && study.gallery.length > 0 && (
        <section className="case-gallery">
          <div className="container">
            {study.gallery.map((item, index) => (
              <Reveal key={`${item.image}-${index}`}>
                <figure className="case-gallery-image">
                  <img src={item.image} alt={item.alt} />
                  <figcaption>{item.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SYSTEM
      ======================================================== */}

      <section className="case-system">
        <div className="container">
          <Reveal>
            <div className="system-grid">
              <div>
                <span className="case-section-label">04 · The system</span>
                <h2>{study.system.heading}</h2>
              </div>

              <div>
                <p className="system-body">{study.system.body}</p>

                <div className="system-list">
                  {study.system.items.map((item, index) => (
                    <div className="system-item" key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          OUTCOME
      ======================================================== */}

      <section className="case-outcome">
        <div className="container">
          <Reveal>
            <div className="outcome-inner">
              <span className="case-section-label">05 · Outcome</span>

              <h2>{study.outcome.heading}</h2>

              <p className="outcome-text">{study.outcome.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          NEXT CASE STUDY
      ======================================================== */}

      <section className="case-next">
        <div className="container">
          <Reveal>
            <div className="case-next-inner">
              <div>
                <span className="case-section-label">Next case study</span>

                <h2>
                  {nextStudy.name}
                  <span>.</span>
                </h2>

                <p>
                  {nextStudy.industry} · {nextStudy.type}
                </p>
              </div>

              <Link
                to={`/casestudy/${nextStudy.slug}`}
                className="case-next-link"
              >
                <span>Explore case study</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          CTA
      ======================================================== */}

      <section className="case-final-cta">
        <div className="container">
          <Reveal>
            <div className="case-final-cta-inner">
              <span className="case-section-label">Have a similar problem?</span>

              <h2>
                Let's build
                <br />
                <em>what's next.</em>
              </h2>

              <Link to="/contact" className="case-cta">
                <span>Start a conversation</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CaseStudyStyles />
    </PublicLayout>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

function CaseStudyStyles() {
  return (
    <style>{`
      .case-hero {
        padding: 42px 0 100px;
      }

      .case-hero-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        padding-bottom: 26px;
        border-bottom: 1px solid var(--border);
      }

      .case-back,
      .case-back-button {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        transition: color 220ms ease;
      }

      .case-back:hover,
      .case-back-button:hover {
        color: var(--text-primary);
      }

      .case-index {
        color: var(--text-muted);
        font-size: 0.6rem;
        letter-spacing: 0.14em;
      }

      .case-hero-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        margin-top: 30px;
      }

      .case-hero-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-muted);
        font-size: 0.61rem;
        text-transform: uppercase;
        letter-spacing: 0.13em;
      }

      .case-hero-meta i {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: var(--text-muted);
      }

      .case-client {
        color: var(--text-muted);
        font-size: 0.61rem;
        text-transform: uppercase;
        letter-spacing: 0.13em;
      }

      .case-title-wrap {
        max-width: 1100px;
        padding: 85px 0 70px;
      }

      .case-kicker {
        margin: 0 0 24px;
        color: var(--text-muted);
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
      }

      .case-title-wrap h1 {
        max-width: 1060px;
        margin: 0;
        color: var(--text-primary);
        font-size: clamp(4rem, 8vw, 8.8rem);
        line-height: 0.88;
        letter-spacing: -0.075em;
        font-weight: 400;
      }

      .case-lead {
        max-width: 720px;
        margin: 42px 0 0;
        color: var(--text-secondary);
        font-size: clamp(1rem, 1.4vw, 1.2rem);
        line-height: 1.7;
      }

      .case-hero-image {
        position: relative;
        aspect-ratio: 16 / 8.6;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--surface);
      }

      .case-hero-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        filter: grayscale(100%);
        transform: scale(1.001);
        transition:
          filter 900ms cubic-bezier(0.16, 1, 0.3, 1),
          transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .case-hero-image:hover img {
        filter: grayscale(0%);
        transform: scale(1.025);
      }

      .case-image-treatment {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.05) 35%,
            rgba(0, 0, 0, 0.52) 100%
          );
        transition: opacity 600ms ease;
      }

      .case-hero-image:hover .case-image-treatment {
        opacity: 0.45;
      }

      .case-image-bottom {
        position: absolute;
        left: 24px;
        right: 24px;
        bottom: 22px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        color: rgba(255,255,255,0.7);
        font-size: 0.58rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }

      .case-intro {
        padding: 125px 0;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }

      .case-intro-grid {
        display: grid;
        grid-template-columns: 0.3fr 1fr;
        gap: 90px;
      }

      .case-section-label {
        display: inline-block;
        color: var(--text-muted);
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
      }

      .case-intro-text {
        max-width: 900px;
        margin: 0;
        color: var(--text-primary);
        font-size: clamp(1.7rem, 3vw, 3.05rem);
        line-height: 1.2;
        letter-spacing: -0.045em;
        font-weight: 400;
      }

      .case-snapshot {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin-top: 72px;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }

      .case-snapshot > div {
        padding: 22px 20px 22px 0;
        border-right: 1px solid var(--border);
      }

      .case-snapshot > div:not(:first-child) {
        padding-left: 20px;
      }

      .case-snapshot > div:last-child {
        border-right: 0;
      }

      .case-snapshot span {
        display: block;
        margin-bottom: 10px;
        color: var(--text-muted);
        font-size: 0.57rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }

      .case-snapshot strong {
        color: var(--text-primary);
        font-size: 0.78rem;
        font-weight: 400;
      }

      .case-capabilities {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 26px;
      }

      .case-capabilities span {
        padding: 9px 11px;
        border: 1px solid var(--border);
        color: var(--text-muted);
        font-size: 0.57rem;
        text-transform: uppercase;
        letter-spacing: 0.09em;
      }

      .case-block {
        padding: 135px 0;
        border-bottom: 1px solid var(--border);
      }

      .case-two-column {
        display: grid;
        grid-template-columns: 0.62fr 1fr;
        gap: 130px;
      }

      .case-two-column h2,
      .case-solution-heading h2,
      .system-grid h2,
      .outcome-inner h2 {
        max-width: 760px;
        margin: 22px 0 0;
        color: var(--text-primary);
        font-size: clamp(3.5rem, 6vw, 6.7rem);
        line-height: 0.91;
        letter-spacing: -0.065em;
        font-weight: 400;
      }

      .case-body-large {
        max-width: 690px;
        margin: 0;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.8;
      }

      .case-points {
        margin-top: 50px;
        border-top: 1px solid var(--border);
      }

      .case-point {
        display: flex;
        align-items: flex-start;
        gap: 13px;
        padding: 17px 0;
        border-bottom: 1px solid var(--border);
        color: var(--text-secondary);
        font-size: 0.76rem;
        line-height: 1.5;
      }

      .case-point svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--text-primary);
      }

      .case-approach {
        padding: 150px 0;
        background: var(--surface);
        border-bottom: 1px solid var(--border);
      }

      .approach-layout {
        display: grid;
        grid-template-columns: 0.3fr 1fr;
        gap: 90px;
      }

      .approach-number {
        color: var(--text-muted);
        font-size: 0.62rem;
        letter-spacing: 0.16em;
      }

      .approach-layout h2 {
        max-width: 920px;
        margin: 20px 0 35px;
        color: var(--text-primary);
        font-size: clamp(3rem, 6vw, 6.3rem);
        line-height: 0.92;
        letter-spacing: -0.065em;
        font-weight: 400;
      }

      .approach-layout p {
        max-width: 720px;
        margin: 0;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.8;
      }

      .case-solutions {
        padding: 135px 0;
        border-bottom: 1px solid var(--border);
      }

      .case-solution-heading {
        display: grid;
        grid-template-columns: 1fr 0.45fr;
        gap: 100px;
        margin-bottom: 75px;
      }

      .case-solution-heading > p {
        align-self: end;
        max-width: 400px;
        margin: 0;
        color: var(--text-muted);
        font-size: 0.8rem;
        line-height: 1.75;
      }

      .solution-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        border-top: 1px solid var(--border);
        border-left: 1px solid var(--border);
      }

      .solution-card {
        position: relative;
        min-height: 310px;
        padding: 28px;
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        transition: background 350ms ease;
      }

      .solution-card:hover {
        background: var(--surface);
      }

      .solution-number {
        color: var(--text-muted);
        font-size: 0.58rem;
        letter-spacing: 0.15em;
      }

      .solution-card-content {
        max-width: 500px;
        margin-top: 105px;
      }

      .solution-card h3 {
        margin: 0 0 14px;
        color: var(--text-primary);
        font-size: 1.35rem;
        line-height: 1.1;
        letter-spacing: -0.025em;
        font-weight: 400;
      }

      .solution-card p {
        max-width: 460px;
        margin: 0;
        color: var(--text-muted);
        font-size: 0.78rem;
        line-height: 1.75;
      }

      .solution-arrow {
        position: absolute;
        top: 27px;
        right: 27px;
        color: var(--text-muted);
        opacity: 0;
        transform: translate(-5px, 5px);
        transition:
          opacity 280ms ease,
          transform 280ms ease;
      }

      .solution-card:hover .solution-arrow {
        opacity: 1;
        transform: translate(0, 0);
      }

      .case-gallery {
        padding: 0 0 135px;
      }

      .case-gallery-image {
        position: relative;
        margin: 0;
        aspect-ratio: 16 / 8;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--surface);
      }

      .case-gallery-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        filter: grayscale(100%);
        transition:
          filter 800ms cubic-bezier(0.16, 1, 0.3, 1),
          transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .case-gallery-image:hover img {
        filter: grayscale(0%);
        transform: scale(1.025);
      }

      .case-gallery-image figcaption {
        position: absolute;
        left: 20px;
        bottom: 18px;
        color: rgba(255,255,255,0.72);
        font-size: 0.57rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
      }

      .case-system {
        padding: 135px 0;
        background: var(--surface);
        border-bottom: 1px solid var(--border);
      }

      .system-grid {
        display: grid;
        grid-template-columns: 0.72fr 1fr;
        gap: 130px;
      }

      .system-body {
        max-width: 660px;
        margin: 0 0 55px;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.8;
      }

      .system-list {
        border-top: 1px solid var(--border);
      }

      .system-item {
        display: grid;
        grid-template-columns: 45px 1fr;
        gap: 15px;
        padding: 17px 0;
        border-bottom: 1px solid var(--border);
      }

      .system-item span {
        color: var(--text-muted);
        font-size: 0.58rem;
        letter-spacing: 0.12em;
      }

      .system-item p {
        margin: 0;
        color: var(--text-primary);
        font-size: 0.78rem;
      }

      .case-outcome {
        padding: 160px 0;
        border-bottom: 1px solid var(--border);
        background:
          radial-gradient(
            circle at 80% 50%,
            rgba(255,255,255,0.035),
            transparent 38%
          );
      }

      .outcome-inner {
        max-width: 1050px;
      }

      .outcome-text {
        max-width: 760px;
        margin: 48px 0 0;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.8;
      }

      .case-next {
        padding: 100px 0;
      }

      .case-next-inner {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 50px;
        padding: 65px 45px;
        border: 1px solid var(--border);
        transition: background 350ms ease;
      }

      .case-next-inner:hover {
        background: var(--surface);
      }

      .case-next h2 {
        margin: 20px 0 8px;
        color: var(--text-primary);
        font-size: clamp(3.3rem, 6vw, 6rem);
        line-height: 0.9;
        letter-spacing: -0.07em;
        font-weight: 400;
      }

      .case-next h2 span {
        color: var(--text-muted);
      }

      .case-next p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }

      .case-next-link,
      .case-cta {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
        padding: 14px 18px;
        background: var(--text-primary);
        color: var(--background);
        text-decoration: none;
        font-size: 0.61rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition:
          transform 250ms ease,
          opacity 250ms ease;
      }

      .case-next-link:hover,
      .case-cta:hover {
        transform: translateY(-2px);
        opacity: 0.88;
      }

      .case-final-cta {
        padding: 30px 0 110px;
      }

      .case-final-cta-inner {
        padding: 100px 45px;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
      }

      .case-final-cta h2 {
        margin: 22px 0 40px;
        color: var(--text-primary);
        font-size: clamp(4rem, 8vw, 8rem);
        line-height: 0.86;
        letter-spacing: -0.075em;
        font-weight: 400;
      }

      .case-final-cta h2 em {
        color: var(--text-muted);
        font-style: normal;
      }

      .case-not-found {
        padding: 180px 0;
      }

      .case-not-found h1 {
        max-width: 850px;
        margin: 25px 0;
        color: var(--text-primary);
        font-size: clamp(4rem, 8vw, 8rem);
        line-height: 0.88;
        letter-spacing: -0.075em;
        font-weight: 400;
      }

      .case-not-found p {
        max-width: 520px;
        margin: 0 0 40px;
        color: var(--text-secondary);
        line-height: 1.7;
      }

      @media (max-width: 850px) {
        .case-hero {
          padding: 28px 0 75px;
        }

        .case-title-wrap {
          padding: 65px 0 50px;
        }

        .case-title-wrap h1 {
          font-size: clamp(3.4rem, 14vw, 6rem);
        }

        .case-hero-image {
          aspect-ratio: 1 / 1;
        }

        .case-intro,
        .case-block,
        .case-solutions,
        .case-approach,
        .case-system {
          padding: 90px 0;
        }

        .case-intro-grid,
        .case-two-column,
        .approach-layout,
        .case-solution-heading,
        .system-grid {
          grid-template-columns: 1fr;
          gap: 42px;
        }

        .case-intro-text {
          font-size: 1.7rem;
        }

        .case-snapshot {
          grid-template-columns: repeat(2, 1fr);
        }

        .case-snapshot > div:nth-child(2) {
          border-right: 0;
        }

        .case-snapshot > div:nth-child(3) {
          border-top: 1px solid var(--border);
        }

        .case-snapshot > div:nth-child(4) {
          border-top: 1px solid var(--border);
        }

        .case-two-column h2,
        .case-solution-heading h2,
        .system-grid h2,
        .outcome-inner h2,
        .approach-layout h2 {
          font-size: 3.6rem;
        }

        .solution-grid {
          grid-template-columns: 1fr;
        }

        .solution-card {
          min-height: 260px;
        }

        .case-gallery {
          padding-bottom: 90px;
        }

        .case-gallery-image {
          aspect-ratio: 1 / 1;
        }

        .case-outcome {
          padding: 100px 0;
        }

        .case-next {
          padding: 70px 0;
        }

        .case-next-inner {
          display: block;
          padding: 42px 25px;
        }

        .case-next h2 {
          font-size: 3.8rem;
        }

        .case-next-link {
          margin-top: 35px;
        }

        .case-final-cta-inner {
          padding: 70px 25px;
        }

        .case-final-cta h2 {
          font-size: 4.5rem;
        }
      }

      @media (max-width: 520px) {
        .case-hero-top {
          align-items: flex-start;
          flex-direction: column;
          gap: 15px;
        }

        .case-hero-meta {
          flex-wrap: wrap;
        }

        .case-image-bottom {
          left: 16px;
          right: 16px;
          bottom: 15px;
        }

        .case-snapshot {
          grid-template-columns: 1fr;
        }

        .case-snapshot > div,
        .case-snapshot > div:not(:first-child) {
          padding: 18px 0;
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .case-snapshot > div:last-child {
          border-bottom: 0;
        }

        .case-snapshot > div:nth-child(3),
        .case-snapshot > div:nth-child(4) {
          border-top: 0;
        }

        .case-two-column h2,
        .case-solution-heading h2,
        .system-grid h2,
        .outcome-inner h2,
        .approach-layout h2 {
          font-size: 3rem;
        }

        .case-final-cta h2 {
          font-size: 3.8rem;
        }
      }
    `}</style>
  );
}
