import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GetQuote from "./pages/GetQuote";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import Careers from "./pages/Careers";
import CareersAdmin from "./pages/CareersAdmin";
import CareersAbout from "./pages/careers/About";

import CareersWhyJoin from "./pages/careers/WhyJoinPage";
import CareersProcess from "./pages/careers/ProcessPage";
import CareersResumeTips from "./pages/careers/ResumeTipsPage";
import CareersFAQ from "./pages/careers/FAQPage";
import CareersApply from "./pages/careers/ApplyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/about" element={<CareersAbout />} />
            <Route path="/careers/openings" element={<Navigate to="/careers/apply" replace />} />
            <Route path="/careers/why-join" element={<CareersWhyJoin />} />
            <Route path="/careers/process" element={<CareersProcess />} />
            <Route path="/careers/resume-tips" element={<CareersResumeTips />} />
            <Route path="/careers/faq" element={<CareersFAQ />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="/careers/admin" element={<CareersAdmin />} />
            <Route path="/services/web-development" element={<Services />} />
            <Route path="/services/mobile-apps" element={<Services />} />
            <Route path="/services/meta-ads" element={<Services />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
