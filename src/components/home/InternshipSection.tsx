import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { JobOpening } from "@/components/careers/JobCard";

const featuredInternships = [
  {
    title: "Web Development Internship",
    job_type: "Internship",
    location: "Remote / Bengaluru",
    experience_level: "Students & freshers",
    description: "Build responsive websites and real client projects with the DevHorizon engineering team.",
  },
  {
    title: "Mobile App Development Internship",
    job_type: "Internship",
    location: "Remote / Bengaluru",
    experience_level: "Students & freshers",
    description: "Learn how production-ready Android and iOS applications are designed, built and shipped.",
  },
  {
    title: "AI/ML Internship",
    job_type: "Internship",
    location: "Remote / Bengaluru",
    experience_level: "Students & freshers",
    description: "Work on practical automation and intelligent product experiences with modern AI tools.",
  },
  {
    title: "Quality Engineering Internship",
    job_type: "Internship",
    location: "Remote / Bengaluru",
    experience_level: "Students & freshers",
    description: "Develop testing skills while helping teams deliver reliable digital products.",
  },
];

export const InternshipSection = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    supabase
      .from("job_openings")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .then(({ data }) => setJobs((data ?? []) as JobOpening[]));
  }, []);

  const internships = jobs.filter(
    (job) =>
      job.job_type?.toLowerCase().includes("intern") ||
      job.title?.toLowerCase().includes("intern"),
  );
  const roles = internships.length > 0 ? internships : jobs;
  const visibleRoles = roles.length > 0 ? roles : featuredInternships;
  const applicationRoles = visibleRoles.map((job) => ({
    title: job.title,
    job_type: job.job_type,
  }));

  return (
    <section id="internships" className="section-padding relative overflow-hidden scroll-mt-24 bg-secondary/20">
      <div className="container-swiss">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Internships</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" aria-hidden="true" />
            Internship <span className="text-primary">Opportunities</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            DevHorizon Technologies Private Limited offers structured internships for students and
            freshers in web development, mobile app development, AI/ML and quality engineering.
            Browse the official internship opportunities below and fill in your details to apply —
            no login required.
          </p>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-foreground">Official DevHorizon internship programme</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This internship umbrella is published on the official DevHorizon Technologies website.
                Students can submit their information directly through this application form for review.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {visibleRoles.map((job) => (
            <div key={job.title} className="surface-card flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Internship
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" aria-hidden="true" /> {job.job_type}
                </span>
                {job.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" /> {job.location}
                  </span>
                )}
                {job.experience_level && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden="true" /> {job.experience_level}
                  </span>
                )}
              </div>
              {job.description && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl">
                <GraduationCap className="mr-2 h-5 w-5" aria-hidden="true" />
                Internship application form
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Internship application form</DialogTitle>
                <DialogDescription>
                  Fill in your details and upload your resume. Our team reviews every application
                  within approximately 5 business days.
                </DialogDescription>
              </DialogHeader>
              <ApplyForm openRoles={applicationRoles} prefillType="Internship" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
