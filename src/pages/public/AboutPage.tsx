import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/config/site";
import { ApproachSection } from "@/components/ApproachSection";

export function AboutPage() {
  const founderName = "Rohit Thakur";

  const founderImage =
    siteConfig.founderImageUrl || import.meta.env.VITE_FOUNDER_IMAGE_URL || "";

  const capabilities = [
    "Healthcare Consulting",
    "Product Strategy",
    "Digital Transformation",
    "Technology Consulting",
    "Product Development",
    "Startup Strategy",
    "Business Systems",
    "Web & Software Engineering",
  ];

  const principles = [
    {
      number: "01",
      title: "Think before building.",
      description:
        "Every engagement starts with understanding the business problem, the users, the constraints and the outcome that actually matters.",
    },
    {
      number: "02",
      title: "Design the system.",
      description:
        "The right product is more than a polished interface. We design the workflows, information architecture and technology underneath it.",
    },
    {
      number: "03",
      title: "Build for reality.",
      description:
        "Ideas only create value when they work in the real world. HackBase focuses on systems that teams can actually use, operate and improve.",
    },
    {
      number: "04",
      title: "Stay close to execution.",
      description:
        "Strategy, product and engineering remain connected throughout the engagement so decisions do not get lost between a strategy deck and implementation.",
    },
  ];

  const expertise = [
    "Healthcare operations",
    "Healthcare digital products",
    "Startup product development",
    "Business process digitization",
    "Product strategy",
    "Technology architecture",
    "Operational systems",
    "Digital experiences",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About HackBase",
    description:
      "Learn about HackBase, a healthcare consulting and product development company founded by Rohit Thakur, focused on healthcare technology, product strategy, digital transformation and business systems.",
    url: "/about",
    mainEntity: {
      "@type": "Person",
      name: founderName,
      jobTitle: "Founder, Consultant & Product Strategist",
      worksFor: {
        "@type": "Organization",
        name: siteConfig.brandName || "HackBase",
      },
    },
  };

  return (
    <PublicLayout>
      <SEO
        title="About HackBase — Healthcare Consulting & Product Strategy | Rohit Thakur"
        description="HackBase is a healthcare consulting and product development company founded by Rohit Thakur. We help healthcare organizations and ambitious startups with product strategy, digital transformation, technology consulting and high-quality software development."
        canonicalPath="/about"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">
        <div className="container">
          <Reveal>
            <div className="about-hero-meta">
              <span>HackBase</span>
              <i />
              <span>Healthcare · Products · Technology</span>
            </div>

            <div className="about-hero-content">
              <p className="eyebrow">About HackBase</p>

              <h1>
                We build what ambitious
                <br />
                <em>organizations need next.</em>
              </h1>

              <p className="about-hero-description">
                HackBase is a healthcare consulting and product development
                company working at the intersection of strategy, technology,
                product thinking and execution.
              </p>
            </div>

            <div className="about-hero-bottom">
              <span>Founded by {founderName}</span>

              <Link to="/contact" className="about-hero-link">
                <span>Work with us</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          POSITIONING
      ===================================================== */}

      <section className="about-positioning">
        <div className="container">
          <Reveal>
            <div className="positioning-grid">
              <div>
                <span className="section-number">01 · What we do</span>
              </div>

              <div>
                <h2>
                  Not just consultants.
                  <br />
                  Not just developers.
                </h2>

                <p className="positioning-lead">
                  We operate between business strategy, product development and
                  technology execution.
                </p>

                <p>
                  Healthcare organizations and startups often face problems that
                  cannot be solved by strategy alone. A strategy deck does not
                  digitize an operation. A developer alone does not necessarily
                  know which problem should be solved first.
                </p>

                <p>
                  HackBase brings those disciplines together. We understand the
                  problem, shape the product, design the system and build the
                  technology required to make it work.
                </p>

                <p>
                  The goal is simple: create useful systems that produce
                  measurable business value and can continue to evolve after the
                  initial engagement.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FOUNDER
      ===================================================== */}

      <section className="about-founder">
        <div className="container">
          <div className="founder-grid">
            <Reveal>
              <div className="founder-portrait">
                {founderImage ? (
                  <img
                    src="https://res.cloudinary.com/dg1yfhbcg/image/upload/v1789063189/1788865342759.jpg"
                    alt={`${founderName}, Founder of HackBase`}
                  />
                ) : (
                  <div className="founder-placeholder">
                    <span>{founderName}</span>
                  </div>
                )}

                <div className="portrait-overlay">
                  <span>Founder · HackBase</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="founder-copy">
                <div className="founder-label">
                  <Sparkles size={13} />
                  <span>The person behind HackBase</span>
                </div>

                <h2>
                  {founderName}
                  <span>.</span>
                </h2>

                <p className="founder-role">
                  Founder · Consultant · Product Strategist · Technology Builder
                </p>

                <p className="founder-lead">
                  Building at the intersection of healthcare, technology,
                  product and business strategy.
                </p>

                <p>
                  {founderName} founded HackBase around a simple idea: ambitious
                  organizations should not have to choose between strategic
                  thinking and high-quality execution.
                </p>

                <p>
                  His work spans healthcare consulting, digital product
                  development, technology strategy and business systems —
                  helping organizations move from an unclear problem to a
                  working digital solution.
                </p>

                <p>
                  Rather than treating consulting, product and engineering as
                  separate services, HackBase brings them together into one
                  execution-oriented approach.
                </p>

                <div className="founder-signature">
                  <strong>{founderName}</strong>
                  <span>Founder, {siteConfig.brandName || "HackBase"}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERTISE
      ===================================================== */}

      <section className="about-expertise">
        <div className="container">
          <Reveal>
            <div className="expertise-header">
              <div>
                <span className="section-number">02 · Areas of expertise</span>

                <h2>
                  Where strategy
                  <br />
                  meets execution.
                </h2>
              </div>

              <p>
                HackBase works across the business and technology layers of
                healthcare organizations, startups and growing companies.
              </p>
            </div>
          </Reveal>

          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <Reveal key={item} delay={Math.min(index * 0.04, 0.24)}>
                <div className="expertise-item">
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                  <ArrowUpRight size={15} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="about-capabilities">
        <div className="container">
          <Reveal>
            <div className="capabilities-intro">
              <span className="section-number">03 · Capabilities</span>

              <h2>
                One partner from
                <br />
                problem to production.
              </h2>

              <p>
                From early product thinking to technology implementation,
                HackBase brings the capabilities required to move an idea or
                operational problem forward.
              </p>
            </div>
          </Reveal>

          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <Reveal key={capability} delay={Math.min(index * 0.035, 0.2)}>
                <div className="capability-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <h3>{capability}</h3>

                  <Check size={16} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="about-principles">
        <div className="container">
          <Reveal>
            <div className="principles-heading">
              <span className="section-number">04 · How we think</span>

              <h2>
                Clear thinking.
                <br />
                Serious execution.
              </h2>
            </div>
          </Reveal>

          <div className="principles-grid">
            {principles.map((principle, index) => (
              <Reveal
                key={principle.number}
                delay={Math.min(index * 0.05, 0.2)}
              >
                <article className="principle-card">
                  <span>{principle.number}</span>

                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXISTING APPROACH
      ===================================================== */}

      <ApproachSection />

      {/* =====================================================
          WORK / PROOF
      ===================================================== */}

      <section className="about-proof">
        <div className="container">
          <Reveal>
            <div className="proof-grid">
              <div>
                <span className="section-number">05 · Selected work</span>

                <h2>
                  The work is the
                  <br />
                  proof.
                </h2>
              </div>

              <div>
                <p>
                  HackBase's work is built around real operational and product
                  problems — from healthcare infrastructure and patient
                  workflows to digital products and startup technology.
                </p>

                <Link to="/work" className="proof-link">
                  <span>Explore selected work</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="about-final-cta">
        <div className="container">
          <Reveal>
            <div className="final-cta-inner">
              <span className="section-number">Start something meaningful</span>

              <h2>
                Have a difficult
                <br />
                <em>problem to solve?</em>
              </h2>

              <p>
                Tell us what you're building, what is not working, or where you
                want to go next. We'll start with the problem.
              </p>

              <Link to="/contact" className="final-cta-button">
                <span>Start a conversation</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          PAGE STYLES
      ===================================================== */}

      <style>{`
        .about-hero {
          padding: 42px 0 0;
        }

        .about-hero-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 25px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .about-hero-meta i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .about-hero-content {
          padding: 105px 0 90px;
        }

        .about-hero-content h1 {
          max-width: 1200px;
          margin: 22px 0 0;
          color: var(--text-primary);
          font-size: clamp(4.1rem, 8.2vw, 9rem);
          line-height: 0.86;
          letter-spacing: -0.08em;
          font-weight: 400;
        }

        .about-hero-content h1 em {
          color: var(--text-muted);
          font-style: normal;
        }

        .about-hero-description {
          max-width: 650px;
          margin: 48px 0 0;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .about-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 20px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .about-hero-link,
        .proof-link,
        .final-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
        }

        .about-hero-link {
          color: var(--text-primary);
        }

        .about-positioning {
          padding: 145px 0;
          border-bottom: 1px solid var(--border);
        }

        .positioning-grid {
          display: grid;
          grid-template-columns: 0.35fr 1fr;
          gap: 100px;
        }

        .section-number {
          color: var(--text-muted);
          font-size: 0.59rem;
          text-transform: uppercase;
          letter-spacing: 0.17em;
        }

        .positioning-grid h2,
        .expertise-header h2,
        .capabilities-intro h2,
        .principles-heading h2,
        .proof-grid h2 {
          margin: 22px 0 0;
          color: var(--text-primary);
          font-size: clamp(3.5rem, 6.5vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.07em;
          font-weight: 400;
        }

        .positioning-lead {
          max-width: 750px;
          margin: 0 0 32px;
          color: var(--text-primary);
          font-size: clamp(1.5rem, 2.5vw, 2.5rem);
          line-height: 1.2;
          letter-spacing: -0.035em;
        }

        .positioning-grid p:not(.positioning-lead) {
          max-width: 700px;
          margin: 0 0 22px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.8;
        }

        .about-founder {
          padding: 130px 0;
          background: var(--bg-alt);
          border-bottom: 1px solid var(--border);
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 0.72fr 1fr;
          gap: 110px;
          align-items: center;
        }

        .founder-portrait {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }

        .founder-portrait img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: grayscale(100%);
          transition:
            filter 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .founder-portrait:hover img {
          filter: grayscale(0%);
          transform: scale(1.025);
        }

        .founder-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          background:
            radial-gradient(
              circle at 50% 35%,
              var(--surface-elevated),
              var(--surface)
            );
        }

        .portrait-overlay {
          position: absolute;
          left: 20px;
          bottom: 18px;
          color: rgba(255,255,255,0.72);
          font-size: 0.56rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .founder-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.59rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .founder-copy h2 {
          margin: 20px 0 5px;
          color: var(--text-primary);
          font-size: clamp(4rem, 7vw, 7.5rem);
          line-height: 0.87;
          letter-spacing: -0.08em;
          font-weight: 400;
        }

        .founder-copy h2 span {
          color: var(--text-muted);
        }

        .founder-role {
          margin: 0 0 45px;
          color: var(--text-muted);
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .founder-lead {
          max-width: 720px;
          margin: 0 0 30px;
          color: var(--text-primary);
          font-size: clamp(1.5rem, 2.6vw, 2.5rem);
          line-height: 1.18;
          letter-spacing: -0.035em;
        }

        .founder-copy > p:not(.founder-role):not(.founder-lead) {
          max-width: 690px;
          margin: 0 0 20px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.8;
        }

        .founder-signature {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 38px;
          padding-top: 23px;
          border-top: 1px solid var(--border);
        }

        .founder-signature strong {
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .founder-signature span {
          color: var(--text-muted);
          font-size: 0.65rem;
        }

        .about-expertise {
          padding: 135px 0;
          border-bottom: 1px solid var(--border);
        }

        .expertise-header {
          display: grid;
          grid-template-columns: 1fr 0.5fr;
          gap: 100px;
          align-items: end;
          margin-bottom: 75px;
        }

        .expertise-header > p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.8;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }

        .expertise-item {
          display: grid;
          grid-template-columns: 45px 1fr auto;
          align-items: center;
          gap: 15px;
          min-height: 100px;
          padding: 20px 25px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background 280ms ease;
        }

        .expertise-item:hover {
          background: var(--surface);
        }

        .expertise-item > span {
          color: var(--text-muted);
          font-size: 0.56rem;
          letter-spacing: 0.12em;
        }

        .expertise-item p {
          margin: 0;
          color: var(--text-primary);
          font-size: 0.82rem;
        }

        .expertise-item svg {
          color: var(--text-muted);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition:
            opacity 250ms ease,
            transform 250ms ease;
        }

        .expertise-item:hover svg {
          opacity: 1;
          transform: translate(0, 0);
        }

        .about-capabilities {
          padding: 135px 0;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .capabilities-intro {
          display: grid;
          grid-template-columns: 0.55fr 1fr 0.5fr;
          gap: 60px;
          align-items: end;
          margin-bottom: 75px;
        }

        .capabilities-intro > p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.82rem;
          line-height: 1.75;
        }

        .capability-list {
          border-top: 1px solid var(--border);
        }

        .capability-row {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 25px;
          min-height: 85px;
          border-bottom: 1px solid var(--border);
        }

        .capability-row > span {
          color: var(--text-muted);
          font-size: 0.57rem;
          letter-spacing: 0.12em;
        }

        .capability-row h3 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .capability-row svg {
          color: var(--text-muted);
        }

        .about-principles {
          padding: 135px 0;
          border-bottom: 1px solid var(--border);
        }

        .principles-heading {
          margin-bottom: 75px;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }

        .principle-card {
          display: grid;
          grid-template-columns: 45px 1fr;
          gap: 25px;
          min-height: 280px;
          padding: 28px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background 300ms ease;
        }

        .principle-card:hover {
          background: var(--surface);
        }

        .principle-card > span {
          color: var(--text-muted);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
        }

        .principle-card h3 {
          margin: 65px 0 17px;
          color: var(--text-primary);
          font-size: 1.55rem;
          font-weight: 400;
          letter-spacing: -0.035em;
        }

        .principle-card p {
          max-width: 440px;
          margin: 0;
          color: var(--text-muted);
          font-size: 0.77rem;
          line-height: 1.8;
        }

        .about-proof {
          padding: 135px 0;
          border-bottom: 1px solid var(--border);
        }

        .proof-grid {
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          gap: 110px;
        }

        .proof-grid > div:last-child {
          padding-top: 55px;
        }

        .proof-grid p {
          max-width: 600px;
          margin: 0 0 40px;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.8;
        }

        .proof-link {
          color: var(--text-primary);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--text-primary);
          font-size: 0.63rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .about-final-cta {
          padding: 30px 0 120px;
        }

        .final-cta-inner {
          padding: 105px 45px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .final-cta-inner h2 {
          margin: 23px 0 35px;
          color: var(--text-primary);
          font-size: clamp(4rem, 8vw, 8.5rem);
          line-height: 0.86;
          letter-spacing: -0.08em;
          font-weight: 400;
        }

        .final-cta-inner h2 em {
          color: var(--text-muted);
          font-style: normal;
        }

        .final-cta-inner > p {
          max-width: 550px;
          margin: 0 0 35px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.8;
        }

        .final-cta-button {
          padding: 15px 19px;
          background: var(--text-primary);
          color: var(--background);
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition:
            transform 250ms ease,
            opacity 250ms ease;
        }

        .final-cta-button:hover {
          transform: translateY(-2px);
          opacity: 0.88;
        }

        @media (max-width: 900px) {
          .about-hero-content {
            padding: 75px 0 65px;
          }

          .about-hero-content h1 {
            font-size: clamp(3.5rem, 12vw, 6rem);
          }

          .positioning-grid,
          .founder-grid,
          .proof-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .expertise-header,
          .capabilities-intro {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .proof-grid > div:last-child {
            padding-top: 0;
          }

          .about-positioning,
          .about-founder,
          .about-expertise,
          .about-capabilities,
          .about-principles,
          .about-proof {
            padding: 90px 0;
          }
        }

        @media (max-width: 650px) {
          .about-hero-meta {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .about-hero-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .positioning-grid h2,
          .expertise-header h2,
          .capabilities-intro h2,
          .principles-heading h2,
          .proof-grid h2 {
            font-size: 3.5rem;
          }

          .founder-copy h2 {
            font-size: 4.3rem;
          }

          .expertise-grid,
          .principles-grid {
            grid-template-columns: 1fr;
          }

          .expertise-item {
            min-height: 82px;
          }

          .principle-card {
            min-height: 240px;
          }

          .principle-card h3 {
            margin-top: 45px;
          }

          .capability-row {
            grid-template-columns: 40px 1fr auto;
            gap: 12px;
          }

          .final-cta-inner {
            padding: 70px 25px;
          }

          .final-cta-inner h2 {
            font-size: 4.3rem;
          }
        }
      `}</style>
    </PublicLayout>
  );
}
