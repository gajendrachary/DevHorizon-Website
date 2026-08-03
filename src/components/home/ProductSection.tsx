import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCT_URL = "https://devhorizon-hire.web.app";

const highlights = [
  { icon: Briefcase, title: "Job & role management", desc: "Publish openings and track every pipeline in one place." },
  { icon: Users, title: "Candidate tracking", desc: "Applications, screening and status updates without spreadsheets." },
  { icon: Sparkles, title: "Built by DevHorizon", desc: "Fast, modern and made for growing teams." },
];

export const ProductSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-swiss">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Our Product
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">HorizonHire</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our in-house hiring platform that helps companies post roles, manage applications and hire
            faster — designed and built by DevHorizon Technologies.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-lg border border-border bg-card p-6 shadow-soft"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Button asChild variant="hero" size="xl">
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit HorizonHire, our hiring platform"
              className="flex items-center gap-2"
            >
              Visit HorizonHire
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
