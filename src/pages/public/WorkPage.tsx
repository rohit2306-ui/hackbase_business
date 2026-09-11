import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/animations/Reveal";

/* ============================================================
   MANUAL PROJECT DATA
   ============================================================ */

const projects = [
  {
    id: "01",
    slug: "sargam-healthcare",
    name: "Sargam Healthcare",
    industry: "Healthcare",
    type: "Digital Infrastructure",
    description:
      "A connected digital ecosystem designed to streamline patient workflows, data management and business operations.",
    image:
      "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110622/Screenshot_2026-09-11_123930.png",
    featured: true,
  },
  {
    id: "02",
    slug: "pulsecare",
    name: "Pulsecare",
    industry: "Technology",
    type: "Product Platform",
    description:
      "A platform for discovering, managing and organizing hackathons, technology events and communities.",
    image:
      "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110694/Screenshot_2026-09-11_124114.png",
    featured: false,
  },
  {
    id: "03",
    slug: "pharmorite",
    name: "Pharmorite",
    industry: "HealthTech",
    type: "AI & Computer Vision",
    description:
      "An intelligent diagnostic workflow leveraging medical imaging, computer vision and deep learning.",
    image:
      "https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789110303/Screenshot_2026-09-11_123429.png",
    featured: false,
  },
];

/* ============================================================
   WORK PAGE
   ============================================================ */

export function WorkPage() {
  return (
    <PublicLayout>
      <SEO
        title="Selected Work — Case Studies | HackBase"
        description="Explore selected products, digital systems and technology solutions designed and delivered by HackBase."
        canonicalPath="/work"
      />

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="work-hero">
        <div className="container">
          <Reveal>
            <div className="work-hero-grid">
              <div className="work-hero-left">
                <div className="work-eyebrow">
                  <span className="eyebrow-line" />
                  <span>Selected Work</span>
                </div>

                <h1 className="work-title">
                  From ideas
                  <br />
                  <span>to impact.</span>
                </h1>
              </div>

              <div className="work-hero-right">
                <p className="work-intro">
                  We design and build digital systems that solve real business
                  problems — across healthcare, startups and technology
                  companies.
                </p>

                <div className="work-stats">
                  <div className="work-stat">
                    <strong>06+</strong>
                    <span>Products</span>
                  </div>

                  <div className="work-stat">
                    <strong>04+</strong>
                    <span>Industries</span>
                  </div>

                  <div className="work-stat">
                    <strong>∞</strong>
                    <span>Possibilities</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FILTER BAR */}

          <Reveal delay={0.1}>
            <div className="work-toolbar">
              <div className="work-filters">
                <button className="work-filter active">All</button>

                <button className="work-filter">Healthcare</button>

                <button className="work-filter">Technology</button>

                <button className="work-filter">Real Estate</button>

                <button className="work-filter">Operations</button>

                <button className="work-filter">AI / ML</button>
              </div>

              <div className="work-featured">
                <span>Featured</span>
                <span className="featured-dot" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          PROJECT GRID
      ======================================================== */}

      <section className="work-section">
        <div className="container">
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={Math.min(index * 0.05, 0.25)}>
                <Link
                  to={`/casestudy/${project.slug}`}
                  className={`project-card ${
                    project.featured ? "project-card-featured" : ""
                  }`}
                >
                  {/* IMAGE */}

                  <div className="project-media">
                    <img
                      src={project.image}
                      alt={`${project.name} — HackBase`}
                      className="project-image"
                      loading={index > 2 ? "lazy" : "eager"}
                    />

                    {/* Main black treatment */}

                    <div className="project-dark-layer" />

                    {/* Subtle gradient */}

                    <div className="project-gradient" />

                    {/* Number */}

                    <span className="project-number">{project.id}</span>

                    {/* Arrow */}

                    <span className="project-arrow">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>

                    {/* Image metadata */}

                    <div className="project-meta">
                      <span>{project.industry}</span>
                      <i />
                      <span>{project.type}</span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="project-body">
                    <div className="project-copy">
                      <h2>{project.name}</h2>

                      <p>{project.description}</p>
                    </div>

                    <div className="project-link">
                      <span>View case study</span>

                      <ArrowRight size={16} strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CTA
      ======================================================== */}

      <section className="work-cta">
        <div className="container">
          <Reveal>
            <div className="work-cta-box">
              <div className="cta-left">
                <div className="cta-eyebrow">
                  <span />
                  Ready to build?
                </div>

                <h2>
                  Have a similar
                  <br />
                  <em>problem?</em>
                </h2>
              </div>

              <div className="cta-right">
                <p>
                  Tell us what you're trying to build, improve or change. We'll
                  figure out the right way forward.
                </p>

                <Link to="/contact" className="cta-button">
                  <span>Start a Conversation</span>

                  <ArrowRight size={17} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          STYLES
      ======================================================== */}

      <style>{`

        /* ==========================================================
           HERO
        ========================================================== */

        .work-hero {
          padding: 120px 0 0;
        }

        .work-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: 80px;
          align-items: end;
        }

        .work-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          color: var(--text-muted);
          font-size: 0.64rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.24em;
        }

        .eyebrow-line {
          width: 34px;
          height: 1px;
          background: var(--text-muted);
        }

        .work-title {
          margin: 25px 0 0;
          font-size: clamp(4rem, 7vw, 7.4rem);
          line-height: 0.91;
          letter-spacing: -0.07em;
          font-weight: 400;
          color: var(--text-primary);
        }

        .work-title span {
          color: var(--text-muted);
        }

        .work-hero-right {
          padding-bottom: 7px;
        }

        .work-intro {
          max-width: 460px;
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .work-stats {
          display: flex;
          margin-top: 42px;
          border-top: 1px solid var(--border);
          padding-top: 22px;
        }

        .work-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-right: 1px solid var(--border);
          padding-left: 18px;
        }

        .work-stat:first-child {
          padding-left: 0;
        }

        .work-stat:last-child {
          border-right: 0;
        }

        .work-stat strong {
          font-size: 1.25rem;
          line-height: 1;
          font-weight: 400;
          color: var(--text-primary);
        }

        .work-stat span {
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        /* ==========================================================
           TOOLBAR
        ========================================================== */

        .work-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 80px;
          padding: 16px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .work-filters {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .work-filter {
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          padding: 9px 14px;
          font: inherit;
          font-size: 0.68rem;
          cursor: pointer;
          transition:
            color 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }

        .work-filter:hover {
          color: var(--text-primary);
        }

        .work-filter.active {
          color: var(--text-primary);
          border-color: var(--border);
          background: var(--surface);
        }

        .work-featured {
          display: flex;
          align-items: center;
          gap: 9px;
          padding-right: 4px;
          font-size: 0.64rem;
          color: var(--text-muted);
        }

        .featured-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-primary);
        }

        /* ==========================================================
           PROJECT SECTION
        ========================================================== */

        .work-section {
          padding: 28px 0 120px;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        /* ==========================================================
           CARD
        ========================================================== */

        .project-card {
          display: block;
          min-width: 0;
          color: inherit;
          text-decoration: none;
        }

        .project-media {
          position: relative;
          aspect-ratio: 1.34 / 1;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .project-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;

          /* Initially heavily desaturated/dark */

          filter:
            grayscale(100%)
            brightness(0.42)
            contrast(1.05);

          transform: scale(1.015);

          transition:
            filter 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Black layer */

        .project-dark-layer {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.34);
          transition:
            background 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Bottom readability gradient */

        .project-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.28) 0%,
              transparent 40%,
              rgba(0, 0, 0, 0.78) 100%
            );
          pointer-events: none;
        }

        .project-number {
          position: absolute;
          top: 16px;
          left: 17px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.62rem;
          letter-spacing: 0.15em;
        }

        .project-arrow {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;

          opacity: 0;
          transform: translateY(7px);

          transition:
            opacity 350ms ease,
            transform 350ms ease,
            background 350ms ease;
        }

        .project-meta {
          position: absolute;
          left: 17px;
          right: 17px;
          bottom: 16px;

          display: flex;
          align-items: center;
          gap: 9px;

          color: rgba(255, 255, 255, 0.74);

          font-size: 0.57rem;
          text-transform: uppercase;
          letter-spacing: 0.13em;
        }

        .project-meta i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
        }

        /* ==========================================================
           CARD BODY
        ========================================================== */

        .project-body {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;

          padding: 17px 2px 18px;

          border-bottom: 1px solid var(--border);
        }

        .project-copy {
          min-width: 0;
        }

        .project-copy h2 {
          margin: 0 0 7px;

          font-size: 1.12rem;
          line-height: 1.15;
          font-weight: 450;
          letter-spacing: -0.025em;

          color: var(--text-primary);

          transition: color 250ms ease;
        }

        .project-copy p {
          margin: 0;
          max-width: 310px;

          font-size: 0.76rem;
          line-height: 1.55;

          color: var(--text-muted);

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-link {
          flex-shrink: 0;

          display: flex;
          align-items: center;
          gap: 8px;

          margin-top: 2px;

          font-size: 0.59rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;

          color: var(--text-muted);

          transition:
            color 250ms ease,
            gap 300ms ease;
        }

        /* ==========================================================
           HOVER
        ========================================================== */

        .project-card:hover .project-image {
          /*
             Real image comes back on hover.
          */
          filter:
            grayscale(0%)
            brightness(1)
            contrast(1);

          transform: scale(1.045);
        }

        .project-card:hover .project-dark-layer {
          background: rgba(0, 0, 0, 0.04);
        }

        .project-card:hover .project-arrow {
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover .project-arrow:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .project-card:hover .project-copy h2 {
          color: var(--text-secondary);
        }

        .project-card:hover .project-link {
          color: var(--text-primary);
          gap: 13px;
        }

        /* ==========================================================
           CTA
        ========================================================== */

        .work-cta {
          padding: 0 0 100px;
        }

        .work-cta-box {
          display: grid;
          grid-template-columns: 1fr 0.55fr;
          gap: 80px;

          padding: 65px 48px;

          border: 1px solid var(--border);
          background:
            linear-gradient(
              135deg,
              var(--surface) 0%,
              transparent 100%
            );
        }

        .cta-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 28px;

          color: var(--text-muted);
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .cta-eyebrow span {
          width: 25px;
          height: 1px;
          background: var(--text-muted);
        }

        .work-cta h2 {
          margin: 0;

          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 0.94;
          letter-spacing: -0.065em;
          font-weight: 400;

          color: var(--text-primary);
        }

        .work-cta h2 em {
          color: var(--text-muted);
          font-style: normal;
        }

        .cta-right {
          align-self: center;
          max-width: 390px;
        }

        .cta-right p {
          margin: 0 0 28px;

          color: var(--text-secondary);
          font-size: 0.86rem;
          line-height: 1.65;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 13px;

          padding: 13px 18px;

          color: var(--background);
          background: var(--text-primary);

          text-decoration: none;

          font-size: 0.63rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;

          transition:
            transform 250ms ease,
            opacity 250ms ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        /* ==========================================================
           TABLET
        ========================================================== */

        @media (max-width: 950px) {

          .work-hero-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .work-hero-right {
            max-width: 650px;
          }

          .project-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .work-cta-box {
            grid-template-columns: 1fr;
            gap: 45px;
          }
        }

        /* ==========================================================
           MOBILE
        ========================================================== */

        @media (max-width: 650px) {

          .work-hero {
            padding-top: 90px;
          }

          .work-title {
            font-size: clamp(3.5rem, 17vw, 5rem);
          }

          .work-toolbar {
            margin-top: 55px;
            overflow-x: auto;
            align-items: flex-start;
          }

          .work-filters {
            min-width: max-content;
          }

          .work-featured {
            display: none;
          }

          .work-section {
            padding-top: 20px;
            padding-bottom: 85px;
          }

          .project-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .project-media {
            aspect-ratio: 1.28 / 1;
          }

          /*
             On mobile there is no hover.
             Keep images dark but still visible.
          */

          .project-image {
            filter:
              grayscale(80%)
              brightness(0.52)
              contrast(1.03);
          }

          .project-arrow {
            opacity: 1;
            transform: none;
          }

          .project-body {
            display: block;
          }

          .project-link {
            margin-top: 16px;
          }

          .work-cta {
            padding-bottom: 70px;
          }

          .work-cta-box {
            padding: 42px 25px;
          }

          .work-cta h2 {
            font-size: clamp(3rem, 14vw, 4.4rem);
          }
        }

      `}</style>
    </PublicLayout>
  );
}
