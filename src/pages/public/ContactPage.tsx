import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/animations/Reveal';
import { siteConfig } from '@/config/site';
import { createLead } from '@/services/leads';
import { INDUSTRIES, SERVICE_OPTIONS } from '@/services/leads';

const budgetRanges = [
  'Under $10K',
  '$10K — $25K',
  '$25K — $50K',
  '$50K — $100K',
  '$100K+',
  'Not sure yet',
];

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    service: '',
    message: '',
    budget: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        industry: form.industry || undefined,
        service: form.service || undefined,
        message: form.message || undefined,
      });
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <SEO
        title="Contact — Start a Conversation | HackBase"
        description="Tell us what you're trying to build, improve or change. We'll get back to you to discuss your project."
        canonicalPath="/contact"
      />

      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: '20px' }}>
              Contact
            </p>
            <h1 className="editorial-h1" style={{ marginBottom: '24px', maxWidth: '800px' }}>
              Have a problem worth solving?
            </h1>
            <p className="body-lg" style={{ maxWidth: '480px', marginBottom: '60px' }}>
              Tell us what you're trying to build, improve or change.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '80px',
              alignItems: 'start',
            }}
            className="contact-grid"
          >
            {/* Left: info */}
            <Reveal>
              <div style={{ position: 'sticky', top: '120px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '10px' }}>Email</p>
                    <a
                      href={`mailto:${siteConfig.businessEmail}`}
                      style={{
                        fontSize: '1.0625rem',
                        color: 'var(--text-primary)',
                        transition: 'color 200ms',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                      {siteConfig.businessEmail}
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '10px' }}>Location</p>
                    <p style={{ fontSize: '1.0625rem', color: 'var(--text-primary)' }}>India</p>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '10px' }}>What happens next</p>
                    <p className="body-sm" style={{ lineHeight: 1.7 }}>
                      We review every enquiry and respond within 1-2 business days. If there's a fit,
                      we'll schedule a conversation to understand your problem in detail.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: '64px 48px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--accent-soft)',
                        border: '1px solid rgba(59, 111, 224, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                      }}
                    >
                      <Check size={24} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '12px', color: 'var(--text-primary)' }}>
                      Thank you.
                    </h2>
                    <p className="body-md" style={{ maxWidth: '360px', margin: '0 auto' }}>
                      We've received your enquiry and will be in touch.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    style={{
                      padding: '48px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                    }}
                    className="contact-form"
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="name">Name *</label>
                        <input
                          id="name"
                          type="text"
                          required
                          className="form-input"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="email">Work Email *</label>
                        <input
                          id="email"
                          type="email"
                          required
                          className="form-input"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }} className="form-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="company">Company</label>
                        <input
                          id="company"
                          type="text"
                          className="form-input"
                          value={form.company}
                          onChange={(e) => updateField('company', e.target.value)}
                          placeholder="Company name"
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-input"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }} className="form-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="industry">Industry</label>
                        <select
                          id="industry"
                          className="form-select"
                          value={form.industry}
                          onChange={(e) => updateField('industry', e.target.value)}
                        >
                          <option value="">Select industry</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="service">Service</label>
                        <select
                          id="service"
                          className="form-select"
                          value={form.service}
                          onChange={(e) => updateField('service', e.target.value)}
                        >
                          <option value="">Select service</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-field" style={{ marginTop: '20px' }}>
                      <label className="form-label" htmlFor="message">Project Description *</label>
                      <textarea
                        id="message"
                        required
                        className="form-textarea"
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Tell us about the problem you're trying to solve..."
                        rows={5}
                      />
                    </div>

                    <div className="form-field" style={{ marginTop: '20px' }}>
                      <label className="form-label" htmlFor="budget">Budget Range (Optional)</label>
                      <select
                        id="budget"
                        className="form-select"
                        value={form.budget}
                        onChange={(e) => updateField('budget', e.target.value)}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="form-error" style={{ marginTop: '20px' }}>{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                      style={{
                        marginTop: '28px',
                        width: '100%',
                        justifyContent: 'center',
                        padding: '14px 24px',
                        opacity: submitting ? 0.6 : 1,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {submitting ? (
                        <>
                          <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .contact-grid {
                grid-template-columns: 1fr !important;
                gap: 40px;
              }
              .contact-grid > div:first-child > div {
                position: static !important;
              }
            }
            @media (max-width: 600px) {
              .form-row {
                grid-template-columns: 1fr !important;
              }
              .contact-form {
                padding: 32px 24px !important;
              }
            }
          `}</style>
        </div>
      </section>
    </PublicLayout>
  );
}
