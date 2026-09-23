import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Clock } from "lucide-react";
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
    (j) =>
      j.job_type?.toLowerCase().includes("intern") ||
      j.title?.toLowerCase().includes("intern"),
  );
  const roles = internships.length > 0 ? internships : jobs;

  return (
    <section id="internships" className="section-padding relative overflow-hidden scroll-mt-24">
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
            <GraduationCap className="w-8 h-8 text-primary" />
            Internship <span className="text-primary">Opportunities</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            DevHorizon Technologies Private Limited offers structured internships for students and
            freshers in web development, mobile app development, AI/ML and quality engineering.
            Browse the open internship roles below and fill in your details to apply — no login
            required.
          </p>
        </motion.div>

        {roles.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roles.map((job) => (
              <div key={job.id} className="surface-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" /> {job.job_type}
                  </span>
                  {job.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                  )}
                  {job.experience_level && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {job.experience_level}
                    </span>
                  )}
                </div>
                {job.description && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="xl">
                <GraduationCap className="w-5 h-5 mr-2" />
                Internship application form
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Internship application form</DialogTitle>
                <DialogDescription>
                  Fill in your details and upload your resume. Our team reviews every application
                  within ~5 business days.
                </DialogDescription>
              </DialogHeader>
              <ApplyForm
                openRoles={roles.map((j) => ({ title: j.title, job_type: j.job_type }))}
                prefillType="Internship"
              />
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </section>
  );
};
