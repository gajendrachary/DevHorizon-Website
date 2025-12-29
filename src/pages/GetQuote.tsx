import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, ArrowRight, ArrowLeft, Clock, Sparkles, Zap, Target, Palette as PaletteIcon, Cloud as CloudIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SEO, getBreadcrumbSchema } from '@/components/common/SEO';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for form data
const quoteFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .trim()
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s\-+()]*$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  company: z.string()
    .trim()
    .max(200, 'Company name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .trim()
    .max(2000, 'Message must be less than 2000 characters')
    .optional()
    .or(z.literal('')),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.number().min(30000).max(500000),
  timeline: z.enum(['urgent', 'fast', 'standard', 'flexible']),
});
const ANIMATION_CONFIG = {
  hover: {
    scale: 1.02,
    rotateY: 3,
    rotateX: -2,
  },
  tap: {
    scale: 0.98,
  },
};

const services = [{
  id: 'web',
  emoji: '🌐',
  accentIcon: Sparkles,
  name: 'Web Development',
  price: '₹30,000',
  description: 'Custom websites & web apps',
  timeline: '1-2 weeks'
}, {
  id: 'mobile',
  emoji: '📱',
  accentIcon: Zap,
  name: 'Mobile App Development',
  price: '₹40,000',
  description: 'iOS & Android apps',
  timeline: '2-4 weeks'
}, {
  id: 'ads',
  emoji: '📊',
  accentIcon: Target,
  name: 'Meta Ads Management',
  price: '₹15,000',
  description: 'Facebook & Instagram ads',
  timeline: 'Monthly'
}, {
  id: 'design',
  emoji: '🎨',
  accentIcon: PaletteIcon,
  name: 'UI/UX Design',
  price: '₹20,000',
  description: 'User interface design',
  timeline: '1-2 weeks'
}, {
  id: 'cloud',
  emoji: '☁️',
  accentIcon: CloudIcon,
  name: 'Cloud Solutions',
  price: '₹25,000',
  description: 'Cloud infrastructure',
  timeline: '2-3 weeks'
}];
const timelines = [{
  id: 'urgent',
  emoji: '⚡',
  accentIcon: Zap,
  label: 'Urgent',
  description: '< 1 week',
  multiplier: 1.5
}, {
  id: 'fast',
  emoji: '🚀',
  accentIcon: Sparkles,
  label: 'Fast',
  description: '1-2 weeks',
  multiplier: 1.25
}, {
  id: 'standard',
  emoji: '⏰',
  accentIcon: Clock,
  label: 'Standard',
  description: '2-3 weeks',
  multiplier: 1
}, {
  id: 'flexible',
  emoji: '🌿',
  accentIcon: CloudIcon,
  label: 'Flexible',
  description: '4+ weeks',
  multiplier: 0.9
}];
const GetQuote = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<'urgent' | 'fast' | 'standard' | 'flexible'>('standard');
  const [budget, setBudget] = useState(50000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const {
    toast
  } = useToast();
  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFormErrors({});
    
    // Validate form data
    const validationResult = quoteFormSchema.safeParse({
      ...formData,
      services: selectedServices,
      budget,
      timeline,
    });

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      setIsSubmitting(false);
      
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
      return;
    }

    const validatedData = validationResult.data;
    
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          form_type: 'quote',
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          message: validatedData.message || null,
          services: validatedData.services,
          budget: `₹${validatedData.budget.toLocaleString()}`,
          timeline: validatedData.timeline,
          status: 'new',
        });

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours."
      });
      setStep(1);
      setSelectedServices([]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      setFormErrors({});
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Get a Quote',
    description: 'Request a custom quote for web development, mobile apps, or Meta ads services.',
    mainEntity: {
      '@type': 'Organization',
      name: 'DevHub',
      telephone: '+91-8688097373',
      email: 'contact@devhub.tech',
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://devhub.tech/' },
    { name: 'Get Quote', url: 'https://devhub.tech/get-quote' },
  ]);

  return <Layout>
      <SEO
        title="Get a Free Quote | DevHub - Web & App Development Services"
        description="Request a custom quote for your web development, mobile app, or Meta ads project. Free consultation available. Transparent pricing starting from ₹15,000. Response within 24 hours."
        schema={{ '@context': 'https://schema.org', '@graph': [contactSchema, breadcrumbSchema] }}
      />
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Get a Custom Quote</h1>
              <p className="text-muted-foreground">Tell us about your project and we'll provide a tailored quote.</p>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mt-8">
                {[1, 2, 3].map(s => <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                  </div>)}
              </div>
            </div>

            <div className="bg-card border border-border p-8">
              {/* Step 1: Services */}
              {step === 1 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  <h2 className="text-xl font-bold mb-6">Select Services</h2>
                  <div className="grid gap-4">
                    {services.map((service, index) => {
                      const isSelected = selectedServices.includes(service.id);
                      const AccentIcon = service.accentIcon;
                      
                      return (
                        <motion.button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`relative flex items-center gap-4 p-5 border text-left transition-all rounded-xl overflow-hidden ${
                            isSelected 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ perspective: '1000px' }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: ANIMATION_CONFIG.hover.scale,
                            rotateY: ANIMATION_CONFIG.hover.rotateY,
                            rotateX: ANIMATION_CONFIG.hover.rotateX,
                            boxShadow: '0 15px 30px -10px hsl(var(--primary) / 0.2)'
                          }}
                          whileTap={{ scale: ANIMATION_CONFIG.tap.scale }}
                        >

                          {/* Glow Effect on Selection */}
                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* Accent Corner */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[60px] opacity-50" />

                          {/* Timeline Badge */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs text-foreground font-bold z-10">
                            <Clock className="w-3 h-3" />
                            {service.timeline}
                          </div>

                          {/* Floating Accent Icon */}
                          <motion.div
                            className="absolute top-10 right-3 text-primary/10 z-10"
                            animate={{
                              y: [0, -5, 0],
                              rotate: [0, 8, -8, 0],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <AccentIcon className="w-6 h-6" />
                          </motion.div>

                          {/* 3D Emoji Icon */}
                          <motion.div 
                            className={`relative w-14 h-14 flex items-center justify-center rounded-xl z-10 ${
                              isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                            }`}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-3xl">{service.emoji}</span>
                            {isSelected && (
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-primary/30"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.3, opacity: 0 }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                              />
                            )}
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 relative z-10">
                            <div className="font-bold text-foreground">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.description}</div>
                          </div>

                          {/* Price */}
                          <div className="text-sm font-bold text-primary relative z-10">From {service.price}</div>

                          {/* Selection Checkmark */}
                          {isSelected && (
                            <motion.div
                              className="absolute bottom-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </motion.div>
                          )}

                          {/* Bottom Border Animation */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-b-xl"
                            initial={{ width: '0%' }}
                            animate={{ width: isSelected ? '100%' : '0%' }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>}

              {/* Step 2: Timeline & Budget */}
              {step === 2 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-2xl">📅</span> Timeline & Budget
                  </h2>
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <span className="text-lg">⏱️</span> Project Timeline
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {timelines.map((t, index) => {
                        const isSelected = timeline === t.id;
                        const AccentIcon = t.accentIcon;
                        
                        return (
                          <motion.button
                            key={t.id}
                            onClick={() => setTimeline(t.id as 'urgent' | 'fast' | 'standard' | 'flexible')}
                            className={`relative p-5 border text-center transition-all rounded-xl overflow-hidden ${
                              isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            style={{ perspective: '1000px' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              scale: ANIMATION_CONFIG.hover.scale,
                              rotateY: ANIMATION_CONFIG.hover.rotateY,
                              rotateX: ANIMATION_CONFIG.hover.rotateX,
                              boxShadow: '0 15px 30px -10px hsl(var(--primary) / 0.2)'
                            }}
                            whileTap={{ scale: ANIMATION_CONFIG.tap.scale }}
                          >
                            {/* Glow Effect on Selection */}
                            {isSelected && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}

                            {/* Accent Corner */}
                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[40px] opacity-50" />

                            {/* Floating Accent Icon */}
                            <motion.div
                              className="absolute top-2 right-2 text-primary/20 z-10"
                              animate={{
                                y: [0, -3, 0],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <AccentIcon className="w-4 h-4" />
                            </motion.div>

                            {/* 3D Emoji */}
                            <motion.div 
                              className="relative mb-2"
                              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-3xl">{t.emoji}</span>
                              {isSelected && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-primary/20"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1.5, opacity: 0 }}
                                  transition={{ duration: 0.6, repeat: Infinity }}
                                />
                              )}
                            </motion.div>

                            {/* Content */}
                            <div className="font-bold text-foreground relative z-10">{t.label}</div>
                            <div className="text-xs text-muted-foreground relative z-10">{t.description}</div>

                            {/* Selection Checkmark */}
                            {isSelected && (
                              <motion.div
                                className="absolute bottom-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center z-10"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              >
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </motion.div>
                            )}

                            {/* Bottom Border Animation */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-b-xl"
                              initial={{ width: '0%' }}
                              animate={{ width: isSelected ? '100%' : '0%' }}
                              transition={{ duration: 0.4 }}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Section */}
                  <motion.div
                    className="relative p-6 border border-border rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ 
                      boxShadow: '0 10px 25px -10px hsl(var(--primary) / 0.15)'
                    }}
                  >
                    {/* Accent Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[60px] opacity-50" />
                    
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <span className="text-2xl">💰</span> 
                      <span>Budget Range:</span>
                      <span className="text-primary font-bold">₹{budget.toLocaleString()}</span>
                    </h3>
                    <input 
                      type="range" 
                      min="30000" 
                      max="500000" 
                      step="5000" 
                      value={budget} 
                      onChange={e => setBudget(Number(e.target.value))} 
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-3">
                      <span className="flex items-center gap-1">💵 ₹30,000</span>
                      <span className="flex items-center gap-1">💎 ₹5,00,000+</span>
                    </div>
                  </motion.div>
                </motion.div>}

              {/* Step 3: Contact Details */}
              {step === 3 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-2xl">📋</span> Contact Details
                  </h2>
                  <div className="grid gap-4">
                    {/* Personal Info Section */}
                    <motion.div
                      className="relative p-5 border border-border rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ 
                        boxShadow: '0 10px 25px -10px hsl(var(--primary) / 0.15)'
                      }}
                      style={{ perspective: '1000px' }}
                    >
                      {/* Accent Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[50px] opacity-50" />
                      
                      <h3 className="font-medium mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-lg">👤</span> Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.01 }}
                        >
                          <Input 
                            placeholder="Your Name *" 
                            value={formData.name} 
                            onChange={e => setFormData({
                              ...formData,
                              name: e.target.value
                            })}
                            maxLength={100}
                            className={`transition-all focus:ring-2 focus:ring-primary/20 ${formErrors.name ? 'border-destructive' : ''}`}
                          />
                          {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                        >
                          <Input 
                            placeholder="Company Name" 
                            value={formData.company} 
                            onChange={e => setFormData({
                              ...formData,
                              company: e.target.value
                            })}
                            maxLength={200}
                            className={`transition-all focus:ring-2 focus:ring-primary/20 ${formErrors.company ? 'border-destructive' : ''}`}
                          />
                          {formErrors.company && <p className="text-xs text-destructive mt-1">{formErrors.company}</p>}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Contact Info Section */}
                    <motion.div
                      className="relative p-5 border border-border rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ 
                        boxShadow: '0 10px 25px -10px hsl(var(--primary) / 0.15)'
                      }}
                      style={{ perspective: '1000px' }}
                    >
                      {/* Accent Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[50px] opacity-50" />
                      
                      <h3 className="font-medium mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-lg">📧</span> Contact Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                        >
                          <Input 
                            placeholder="Email Address *" 
                            type="email" 
                            value={formData.email} 
                            onChange={e => setFormData({
                              ...formData,
                              email: e.target.value
                            })}
                            maxLength={255}
                            className={`transition-all focus:ring-2 focus:ring-primary/20 ${formErrors.email ? 'border-destructive' : ''}`}
                          />
                          {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                        >
                          <Input 
                            placeholder="Phone Number" 
                            value={formData.phone} 
                            onChange={e => setFormData({
                              ...formData,
                              phone: e.target.value
                            })}
                            maxLength={20}
                            className={`transition-all focus:ring-2 focus:ring-primary/20 ${formErrors.phone ? 'border-destructive' : ''}`}
                          />
                          {formErrors.phone && <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Message Section */}
                    <motion.div
                      className="relative p-5 border border-border rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ 
                        boxShadow: '0 10px 25px -10px hsl(var(--primary) / 0.15)'
                      }}
                      style={{ perspective: '1000px' }}
                    >
                      {/* Accent Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[50px] opacity-50" />
                      
                      <h3 className="font-medium mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-lg">💬</span> Project Details
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.005 }}
                      >
                        <Textarea 
                          placeholder="Tell us about your project, goals, and any specific requirements..." 
                          rows={4} 
                          value={formData.message} 
                          onChange={e => setFormData({
                            ...formData,
                            message: e.target.value
                          })}
                          maxLength={2000}
                          className={`transition-all focus:ring-2 focus:ring-primary/20 ${formErrors.message ? 'border-destructive' : ''}`}
                        />
                        {formErrors.message && <p className="text-xs text-destructive mt-1">{formErrors.message}</p>}
                        <p className="text-xs text-muted-foreground mt-1 text-right">{formData.message.length}/2000</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button> : <div />}
                
                {step < 3 ? <Button onClick={() => setStep(step + 1)} disabled={step === 1 && selectedServices.length === 0}>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button> : <Button variant="hero" onClick={handleSubmit} disabled={!formData.name || !formData.email || isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </Button>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default GetQuote;