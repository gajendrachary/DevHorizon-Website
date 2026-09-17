import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InternshipSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-swiss">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="surface-card p-8 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="eyebrow justify-center md:justify-start">Internships</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
              Internship <span className="text-primary">Opportunities</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Students and freshers — explore our open internship roles, share your details and start
              building real products with the DevHorizon engineering team.
            </p>
          </div>

          <div className="mt-8 md:mt-0 shrink-0 flex justify-center">
            <Button asChild variant="hero" size="xl" className="pl-8 pr-2">
              <Link
                to="/careers/apply"
                aria-label="View internship opportunities and apply"
                className="flex items-center gap-3"
              >
                <GraduationCap className="w-5 h-5" />
                Apply for an Internship
                <span className="arrow-badge">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
