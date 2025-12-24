import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Globe, Smartphone, BarChart3, Palette, Cloud, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const services = [{
  id: 'web',
  icon: Globe,
  name: 'Web Development',
  price: '₹30,000',
  description: 'Custom websites & web apps'
}, {
  id: 'mobile',
  icon: Smartphone,
  name: 'Mobile App Development',
  price: '₹40,000',
  description: 'iOS & Android apps'
}, {
  id: 'ads',
  icon: BarChart3,
  name: 'Meta Ads Management',
  price: '₹15,000',
  description: 'Facebook & Instagram ads'
}, {
  id: 'design',
  icon: Palette,
  name: 'UI/UX Design',
  price: '₹20,000',
  description: 'User interface design'
}, {
  id: 'cloud',
  icon: Cloud,
  name: 'Cloud Solutions',
  price: '₹25,000',
  description: 'Cloud infrastructure'
}];
const timelines = [{
  id: 'urgent',
  label: 'Urgent',
  description: '< 1 week',
  multiplier: 1.5
}, {
  id: 'fast',
  label: 'Fast',
  description: '1-2 weeks',
  multiplier: 1.25
}, {
  id: 'standard',
  label: 'Standard',
  description: '2-3 weeks',
  multiplier: 1
}, {
  id: 'flexible',
  label: 'Flexible',
  description: '4+ weeks',
  multiplier: 0.9
}];
const GetQuote = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('standard');
  const [budget, setBudget] = useState(50000);
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
  const handleSubmit = () => {
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
  };
  return <Layout>
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
                    {services.map(service => <button key={service.id} onClick={() => toggleService(service.id)} className={`flex items-center gap-4 p-4 border text-left transition-all ${selectedServices.includes(service.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <div className={`w-12 h-12 flex items-center justify-center ${selectedServices.includes(service.id) ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.description}</div>
                        </div>
                        <div className="text-sm font-medium">From {service.price}</div>
                      </button>)}
                  </div>
                </motion.div>}

              {/* Step 2: Timeline & Budget */}
              {step === 2 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  <h2 className="text-xl font-bold mb-6">Timeline & Budget</h2>
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Project Timeline</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timelines.map(t => <button key={t.id} onClick={() => setTimeline(t.id)} className={`p-4 border text-center transition-all ${timeline === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                          <div className="font-semibold">{t.label}</div>
                          <div className="text-xs text-muted-foreground">{t.description}</div>
                        </button>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Budget Range: ₹{budget.toLocaleString()}</h3>
                    <input type="range" min="30000" max="500000" step="5000" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>₹30,000</span>
                      <span>₹1,00,000+</span>
                    </div>
                  </div>
                </motion.div>}

              {/* Step 3: Contact Details */}
              {step === 3 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  <h2 className="text-xl font-bold mb-6">Contact Details</h2>
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Your Name *" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} />
                      <Input placeholder="Email Address *" type="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} />
                      <Input placeholder="Company Name" value={formData.company} onChange={e => setFormData({
                    ...formData,
                    company: e.target.value
                  })} />
                    </div>
                    <Textarea placeholder="Tell us about your project..." rows={4} value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} />
                  </div>
                </motion.div>}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button> : <div />}
                
                {step < 3 ? <Button onClick={() => setStep(step + 1)} disabled={step === 1 && selectedServices.length === 0}>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button> : <Button variant="hero" onClick={handleSubmit} disabled={!formData.name || !formData.email}>
                    Submit Quote Request
                  </Button>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default GetQuote;