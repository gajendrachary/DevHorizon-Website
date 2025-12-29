import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Blog from "./pages/Blog";
import GetQuote from "./pages/GetQuote";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
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
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
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
