/*
# HackBase Schema Part 1 — Admins + Storage Setup

Creates the admins table (referenced by all other table policies) and storage buckets.
Must be applied before other table migrations that reference admins in RLS policies.
*/

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ADMINS
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  name text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Admin can read admins table
DROP POLICY IF EXISTS "admin_select_admins" ON admins;
CREATE POLICY "admin_select_admins" ON admins FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins a WHERE a.id = auth.uid() AND a.active = true)
  );

-- Admin can update admins table
DROP POLICY IF EXISTS "admin_update_admins" ON admins;
CREATE POLICY "admin_update_admins" ON admins FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins a WHERE a.id = auth.uid() AND a.active = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins a WHERE a.id = auth.uid() AND a.active = true)
  );

-- Admin can insert new admins
DROP POLICY IF EXISTS "admin_insert_admins" ON admins;
CREATE POLICY "admin_insert_admins" ON admins FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins a WHERE a.id = auth.uid() AND a.active = true)
  );

-- ============================================
-- STORAGE BUCKETS for images
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonial-photos', 'testimonial-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, admin write
DROP POLICY IF EXISTS "public_read_project_images" ON storage.objects;
CREATE POLICY "public_read_project_images" ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id IN ('project-images', 'testimonial-photos'));

DROP POLICY IF EXISTS "admin_upload_project_images" ON storage.objects;
CREATE POLICY "admin_upload_project_images" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (
    bucket_id IN ('project-images', 'testimonial-photos') AND
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_update_project_images" ON storage.objects;
CREATE POLICY "admin_update_project_images" ON storage.objects FOR UPDATE
  TO authenticated USING (
    bucket_id IN ('project-images', 'testimonial-photos') AND
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );

DROP POLICY IF EXISTS "admin_delete_project_images" ON storage.objects;
CREATE POLICY "admin_delete_project_images" ON storage.objects FOR DELETE
  TO authenticated USING (
    bucket_id IN ('project-images', 'testimonial-photos') AND
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid() AND admins.active = true)
  );
