import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Plus, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { fetchAllProjects, createProject, updateProject, checkSlugUnique, slugify } from '@/services/projects';
import { siteConfig } from '@/config/site';
import type { Project, ProjectInput } from '@/types';

interface FormState extends ProjectInput {
  technologiesInput: string;
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  client: '',
  industry: '',
  project_type: '',
  short_description: '',
  description: '',
  challenge: '',
  approach: '',
  solution: '',
  system: '',
  outcome: '',
  technologiesInput: '',
  technologies: [],
  duration: '',
  cover_image: null,
  gallery: [],
  video_url: '',
  featured: false,
  published: false,
  display_order: 0,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function AdminProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [galleryProgress, setGalleryProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const projects = await fetchAllProjects();
        const project = projects.find((p) => p.id === id);
        if (project) {
          setForm({
            name: project.name,
            slug: project.slug,
            client: project.client || '',
            industry: project.industry || '',
            project_type: project.project_type || '',
            short_description: project.short_description || '',
            description: project.description || '',
            challenge: project.challenge || '',
            approach: project.approach || '',
            solution: project.solution || '',
            system: project.system || '',
            outcome: project.outcome || '',
            technologies: project.technologies || [],
            technologiesInput: (project.technologies || []).join(', '),
            duration: project.duration || '',
            cover_image: project.cover_image,
            gallery: project.gallery || [],
            video_url: project.video_url || '',
            featured: project.featured,
            published: project.published,
            display_order: project.display_order,
          });
        }
      } catch {
        // empty form
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const update = (field: keyof FormState, value: string | boolean | number | string[] | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (value: string) => {
    update('name', value);
    if (!isEditing || !form.slug) {
      update('slug', slugify(value));
    }
  };

  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { setError('File too large. Max 10MB.'); return; }
    if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }

    setError(null);
    setUploadProgress(0);

    try {
      const ext = file.name.split('.').pop();
      const fileName = `cover-${Date.now()}.${ext}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, { onUploadProgress: (ev) => setUploadProgress(Math.round((ev.loaded / ev.total) * 100)) });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(filePath);
      update('cover_image', urlData.publicUrl);
    } catch {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadProgress(null);
    }
  };

  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) { setError('One or more files too large. Max 10MB each.'); return; }
      if (!file.type.startsWith('image/')) { setError('Please upload image files only.'); return; }
    }

    setError(null);
    setGalleryProgress(0);

    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split('.').pop();
        const fileName = `gallery-${Date.now()}-${i}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('project-images').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(fileName);
        urls.push(urlData.publicUrl);
        setGalleryProgress(Math.round(((i + 1) / files.length) * 100));
      }
      update('gallery', [...(form.gallery || []), ...urls]);
    } catch {
      setError('Failed to upload gallery images.');
    } finally {
      setGalleryProgress(null);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...(form.gallery || [])];
    newGallery.splice(index, 1);
    update('gallery', newGallery);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!form.name.trim()) { setError('Project name is required.'); return; }
    if (!form.slug.trim()) { setError('Slug is required.'); return; }

    setSaving(true);
    setError(null);

    try {
      const isUnique = await checkSlugUnique(form.slug, id);
      if (!isUnique) { setError('A project with this slug already exists.'); setSaving(false); return; }

      const techArray = form.technologiesInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: ProjectInput = {
        name: form.name,
        slug: form.slug,
        client: form.client || undefined,
        industry: form.industry || undefined,
        project_type: form.project_type || undefined,
        short_description: form.short_description || undefined,
        description: form.description || undefined,
        challenge: form.challenge || undefined,
        approach: form.approach || undefined,
        solution: form.solution || undefined,
        system: form.system || undefined,
        outcome: form.outcome || undefined,
        technologies: techArray,
        duration: form.duration || undefined,
        cover_image: form.cover_image || null,
        gallery: form.gallery || [],
        video_url: form.video_url || undefined,
        featured: form.featured || false,
        published: form.published || false,
        display_order: form.display_order || 0,
      };

      if (isEditing && id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate(`${siteConfig.adminRoute}/projects`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          to={`${siteConfig.adminRoute}/projects`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', transition: 'color 150ms' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic info */}
        <FormSection title="Basic Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-2col">
            <div className="form-field">
              <label className="form-label">Name *</label>
              <input className="form-input" value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Project name" />
            </div>
            <div className="form-field">
              <label className="form-label">Slug *</label>
              <input className="form-input" value={form.slug} onChange={(e) => update('slug', slugify(e.target.value))} placeholder="url-friendly-slug" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }} className="form-3col">
            <div className="form-field">
              <label className="form-label">Client</label>
              <input className="form-input" value={form.client || ''} onChange={(e) => update('client', e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Industry</label>
              <input className="form-input" value={form.industry || ''} onChange={(e) => update('industry', e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Project Type</label>
              <input className="form-input" value={form.project_type || ''} onChange={(e) => update('project_type', e.target.value)} />
            </div>
          </div>
          <div className="form-field" style={{ marginTop: '20px' }}>
            <label className="form-label">Short Description</label>
            <input className="form-input" value={form.short_description || ''} onChange={(e) => update('short_description', e.target.value)} placeholder="One-line summary" />
          </div>
        </FormSection>

        {/* Cover image */}
        <FormSection title="Cover Image">
          {form.cover_image ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={form.cover_image} alt="Cover" style={{ maxWidth: '400px', borderRadius: '4px', border: '1px solid var(--border)' }} />
              <button
                type="button"
                onClick={() => update('cover_image', null)}
                style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px', background: 'rgba(8,9,11,0.8)', borderRadius: '4px', color: 'var(--text-primary)' }}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '40px', border: '1px dashed var(--border-strong)', borderRadius: '6px',
                cursor: 'pointer', transition: 'border-color 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
            >
              <Upload size={20} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Click to upload cover image</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>Max 10MB</span>
              <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
            </label>
          )}
          {uploadProgress !== null && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ height: '4px', background: 'var(--surface-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--accent)', transition: 'width 200ms' }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>Uploading... {uploadProgress}%</p>
            </div>
          )}
        </FormSection>

        {/* Gallery */}
        <FormSection title="Project Gallery">
          {(form.gallery || []).length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }} className="gallery-admin-grid">
              {form.gallery.map((img, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    style={{ position: 'absolute', top: '4px', right: '4px', padding: '4px', background: 'rgba(8,9,11,0.8)', borderRadius: '3px', color: 'var(--text-primary)' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', border: '1px dashed var(--border-strong)', borderRadius: '6px',
              cursor: 'pointer', transition: 'border-color 200ms', fontSize: '0.8125rem', color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
          >
            <Plus size={15} /> Add gallery images
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} style={{ display: 'none' }} />
          </label>
          {galleryProgress !== null && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Uploading... {galleryProgress}%</p>
          )}
        </FormSection>

        {/* Case study content */}
        <FormSection title="Case Study Content">
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">Overview</label>
            <textarea className="form-textarea" value={form.description || ''} onChange={(e) => update('description', e.target.value)} rows={3} />
          </div>
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">The Challenge</label>
            <textarea className="form-textarea" value={form.challenge || ''} onChange={(e) => update('challenge', e.target.value)} rows={3} />
          </div>
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">The Approach</label>
            <textarea className="form-textarea" value={form.approach || ''} onChange={(e) => update('approach', e.target.value)} rows={3} />
          </div>
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">The Solution</label>
            <textarea className="form-textarea" value={form.solution || ''} onChange={(e) => update('solution', e.target.value)} rows={3} />
          </div>
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">The System</label>
            <textarea className="form-textarea" value={form.system || ''} onChange={(e) => update('system', e.target.value)} rows={3} />
          </div>
          <div className="form-field">
            <label className="form-label">Outcome</label>
            <textarea className="form-textarea" value={form.outcome || ''} onChange={(e) => update('outcome', e.target.value)} rows={3} placeholder="Only include measurable outcomes if available" />
          </div>
        </FormSection>

        {/* Tech + meta */}
        <FormSection title="Technology & Meta">
          <div className="form-field" style={{ marginBottom: '20px' }}>
            <label className="form-label">Technologies (comma-separated)</label>
            <input className="form-input" value={form.technologiesInput} onChange={(e) => update('technologiesInput', e.target.value)} placeholder="React, Node.js, PostgreSQL" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-2col">
            <div className="form-field">
              <label className="form-label">Duration</label>
              <input className="form-input" value={form.duration || ''} onChange={(e) => update('duration', e.target.value)} placeholder="e.g. 3 months" />
            </div>
            <div className="form-field">
              <label className="form-label">Video URL</label>
              <input className="form-input" value={form.video_url || ''} onChange={(e) => update('video_url', e.target.value)} placeholder="Optional" />
            </div>
          </div>
          <div className="form-field" style={{ marginTop: '20px' }}>
            <label className="form-label">Display Order</label>
            <input type="number" className="form-input" value={form.display_order} onChange={(e) => update('display_order', parseInt(e.target.value) || 0)} />
          </div>
        </FormSection>

        {/* Publish settings */}
        <FormSection title="Publishing">
          <div style={{ display: 'flex', gap: '24px' }} className="publish-row">
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={(e) => update('featured', e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={14} /> Featured
              </span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.published || false}
                onChange={(e) => update('published', e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published</span>
            </label>
          </div>
        </FormSection>

        {error && (
          <p className="form-error" style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '4px' }}>
            {error}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', marginBottom: '40px' }}>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? <div className="spinner" style={{ width: '16px', height: '16px', borderTopColor: 'var(--bg)' }} /> : <Save size={15} />}
            {isEditing ? 'Save Changes' : 'Create Project'}
          </button>
          <Link to={`${siteConfig.adminRoute}/projects`} className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>

      <style>{`
        @media (max-width: 768px) {
          .form-2col, .form-3col { grid-template-columns: 1fr !important; }
          .gallery-admin-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .publish-row { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '16px' }}>
        {title}
      </h3>
      <div style={{ padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
        {children}
      </div>
    </div>
  );
}
