import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Public pages
import { HomePage } from "@/pages/public/HomePage";
import { ServicesPage } from "@/pages/public/ServicesPage";
import { ServiceDetailPage } from "@/pages/public/ServiceDetailPage";
import { WorkPage } from "@/pages/public/WorkPage";
import { CaseStudyPage } from "@/pages/public/CaseStudyPage";
import { AboutPage } from "@/pages/public/AboutPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { NotFoundPage } from "@/pages/public/NotFoundPage";

// Admin pages
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminProjects } from "@/pages/admin/AdminProjects";
import { AdminProjectEdit } from "@/pages/admin/AdminProjectEdit";
import { AdminLeads } from "@/pages/admin/AdminLeads";
import { AdminLeadDetail } from "@/pages/admin/AdminLeadDetail";
import { AdminPipeline } from "@/pages/admin/AdminPipeline";
import { AdminServices } from "@/pages/admin/AdminServices";
import { AdminTestimonials } from "@/pages/admin/AdminTestimonials";
import { AdminSettings } from "@/pages/admin/AdminSettings";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/casestudy/:slug" element={<CaseStudyPage />} />

          {/* Admin routes */}
          <Route path="/secure-admin-x7k9/login" element={<AdminLogin />} />
          <Route path="/secure-admin-x7k9" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<AdminProjectEdit />} />
            <Route path="projects/:id" element={<AdminProjectEdit />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="leads/:id" element={<AdminLeadDetail />} />
            <Route path="pipeline" element={<AdminPipeline />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
