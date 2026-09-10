/*
# HackBase Schema Part 2 — Projects, Leads, Services, Testimonials, Site Content, Activities

Creates all business tables with RLS policies that reference the admins table.
*/

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  client text,
  industry text,
  project_type text,
  short_description text,
  description text,
  challenge text,
  approach text,
  solution text,
  system text,
  outcome text,
  technologies text[] DEFAULT '{}',
  duration text,
  cover_image text,
  gallery text[] DEFAULT '{}',
  video_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

DROP POLICY IF EXISTS "public_read_published_projects" ON projects;
CREATE POLICY "public_read_published_projects" ON projects FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_select_projects" ON projects;
CREATE POLICY "admin_select_projects" ON projects FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- LEADS (CRM)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  industry text,
  service text,
  message text,
  source text NOT NULL DEFAULT 'WEBSITE',
  status text NOT NULL DEFAULT 'NEW',
  priority text NOT NULL DEFAULT 'NORMAL',
  assigned_to text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_contacted timestamptz,
  next_follow_up timestamptz,
  notes text
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_leads" ON leads;
CREATE POLICY "admin_select_leads" ON leads FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_leads" ON leads;
CREATE POLICY "admin_update_leads" ON leads FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_leads" ON leads;
CREATE POLICY "admin_delete_leads" ON leads FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  capabilities text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

DROP POLICY IF EXISTS "public_read_published_services" ON services;
CREATE POLICY "public_read_published_services" ON services FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_select_services" ON services;
CREATE POLICY "admin_select_services" ON services FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  company text,
  role text,
  testimonial text NOT NULL,
  photo text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);

DROP POLICY IF EXISTS "public_read_published_testimonials" ON testimonials;
CREATE POLICY "public_read_published_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_select_testimonials" ON testimonials;
CREATE POLICY "admin_select_testimonials" ON testimonials FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- SITE CONTENT
-- ============================================
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_content" ON site_content;
CREATE POLICY "public_read_site_content" ON site_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_site_content" ON site_content;
CREATE POLICY "admin_insert_site_content" ON site_content FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_site_content" ON site_content;
CREATE POLICY "admin_update_site_content" ON site_content FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_site_content" ON site_content;
CREATE POLICY "admin_delete_site_content" ON site_content FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- ACTIVITIES (CRM activity log)
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_activities_lead_id ON activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

DROP POLICY IF EXISTS "admin_select_activities" ON activities;
CREATE POLICY "admin_select_activities" ON activities FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_insert_activities" ON activities;
CREATE POLICY "admin_insert_activities" ON activities FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_activities" ON activities;
CREATE POLICY "admin_delete_activities" ON activities FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

-- ============================================
-- updated_at triggers
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS services_updated_at ON services;
CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS site_content_updated_at ON site_content;
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
