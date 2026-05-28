import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { Loader2, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { applicationSchema } from '@/lib/careersSchemas';
import { SuccessAnimation } from './SuccessAnimation';

interface Props {
  openRoles: { title: string; job_type: string }[];
  prefillRole?: string;
  prefillType?: string;
}

const ACCEPT = '.pdf,.doc,.docx';
const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ApplyForm = ({ openRoles, prefillRole, prefillType }: Props) => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    current_city: '',
    role_applied: '',
    application_type: 'Full-time',
    highest_qualification: '',
    college_university: '',
    years_experience: '',
    skills: '',
    short_intro: '',
    github_url: '',
    linkedin_url: '',
    portfolio_url: '',
    availability: '',
    expected_compensation: '',
    consent_given: false,
  });

  useEffect(() => {
    if (prefillRole) {
      setForm((f) => ({
        ...f,
        role_applied: prefillRole,
        application_type: prefillType === 'Internship' ? 'Internship' : prefillType === 'Full-time' ? 'Full-time' : f.application_type,
      }));
    }
  }, [prefillRole, prefillType]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onFile = (f: File | null) => {
    if (!f) { setFile(null); return; }
    if (!ALLOWED_MIME.includes(f.type)) {
      toast({ title: 'Invalid file', description: 'Please upload a PDF, DOC, or DOCX file.', variant: 'destructive' });
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum size is 5 MB.', variant: 'destructive' });
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: 'Resume required', description: 'Please upload your resume.', variant: 'destructive' });
      return;
    }
    const sanitized = Object.fromEntries(
      Object.entries(form).map(([k, v]) =>
        typeof v === 'string' ? [k, DOMPurify.sanitize(v).trim()] : [k, v]
      )
    ) as typeof form;

    const parsed = applicationSchema.safeParse(sanitized);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        if (e.path[0]) errs[String(e.path[0])] = e.message;
      });
      setErrors(errs);
      toast({ title: 'Please fix the form', description: 'Some fields need attention.', variant: 'destructive' });
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
      const path = `applications/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('resumes')
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase
        .from('job_applications')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert({ ...parsed.data, resume_file_url: path } as any);
      if (insErr) throw insErr;

      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast({ title: 'Submission failed', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessAnimation onClose={() => {
        setSubmitted(false);
        setForm({ ...form, full_name: '', email: '', mobile: '', short_intro: '', skills: '', consent_given: false });
        setFile(null);
        if (fileRef.current) fileRef.current.value = '';
      }} />
    );
  }

  const err = (k: string) => errors[k] && <p className="text-xs text-destructive mt-1">{errors[k]}</p>;

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-8">
      {/* Personal */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Personal</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Full name *</Label>
            <Input value={form.full_name} onChange={(e) => set('full_name', e.target.value)} maxLength={100} />
            {err('full_name')}
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} maxLength={255} />
            {err('email')}
          </div>
          <div>
            <Label>Mobile *</Label>
            <Input value={form.mobile} onChange={(e) => set('mobile', e.target.value)} maxLength={20} />
            {err('mobile')}
          </div>
          <div>
            <Label>Current city *</Label>
            <Input value={form.current_city} onChange={(e) => set('current_city', e.target.value)} maxLength={100} />
            {err('current_city')}
          </div>
        </div>
      </div>

      {/* Role */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Role</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Role applied for *</Label>
            <Select value={form.role_applied} onValueChange={(v) => set('role_applied', v)}>
              <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
              <SelectContent>
                {openRoles.map((r) => (
                  <SelectItem key={r.title} value={r.title}>{r.title}</SelectItem>
                ))}
                <SelectItem value="Other / General application">Other / General application</SelectItem>
              </SelectContent>
            </Select>
            {err('role_applied')}
          </div>
          <div>
            <Label>Application type *</Label>
            <Select value={form.application_type} onValueChange={(v) => set('application_type', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Availability (notice period)</Label>
            <Input value={form.availability} onChange={(e) => set('availability', e.target.value)} maxLength={100} placeholder="e.g. Immediate, 30 days" />
          </div>
          <div>
            <Label>Expected compensation</Label>
            <Input value={form.expected_compensation} onChange={(e) => set('expected_compensation', e.target.value)} maxLength={100} placeholder="Optional" />
          </div>
        </div>
      </div>

      {/* Education & experience */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Education & experience</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Highest qualification *</Label>
            <Input value={form.highest_qualification} onChange={(e) => set('highest_qualification', e.target.value)} maxLength={150} />
            {err('highest_qualification')}
          </div>
          <div>
            <Label>College / university *</Label>
            <Input value={form.college_university} onChange={(e) => set('college_university', e.target.value)} maxLength={200} />
            {err('college_university')}
          </div>
          <div>
            <Label>Years of experience *</Label>
            <Input value={form.years_experience} onChange={(e) => set('years_experience', e.target.value)} maxLength={50} placeholder="e.g. Fresher, 2 yrs" />
            {err('years_experience')}
          </div>
          <div>
            <Label>Key skills *</Label>
            <Input value={form.skills} onChange={(e) => set('skills', e.target.value)} maxLength={500} placeholder="React, Node.js, PostgreSQL" />
            {err('skills')}
          </div>
          <div className="md:col-span-2">
            <Label>Short intro *</Label>
            <Textarea value={form.short_intro} onChange={(e) => set('short_intro', e.target.value)} maxLength={1000} rows={4} placeholder="Tell us about yourself, what you've shipped, and why DevHorizon." />
            {err('short_intro')}
          </div>
        </div>
      </div>

      {/* Links */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Links (optional)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>GitHub URL</Label>
            <Input value={form.github_url} onChange={(e) => set('github_url', e.target.value)} maxLength={500} placeholder="https://github.com/..." />
            {err('github_url')}
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input value={form.linkedin_url} onChange={(e) => set('linkedin_url', e.target.value)} maxLength={500} placeholder="https://linkedin.com/in/..." />
            {err('linkedin_url')}
          </div>
          <div>
            <Label>Portfolio URL</Label>
            <Input value={form.portfolio_url} onChange={(e) => set('portfolio_url', e.target.value)} maxLength={500} placeholder="https://..." />
            {err('portfolio_url')}
          </div>
        </div>
      </div>

      {/* Resume */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Resume *</h3>
        <label
          htmlFor="resume"
          className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-secondary/30 transition-colors text-center"
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-3" />
          {file ? (
            <>
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB · Click to replace</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Click to upload your resume</span>
              <span className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX · max 5 MB</span>
            </>
          )}
          <input
            id="resume"
            ref={fileRef}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={form.consent_given}
          onCheckedChange={(v) => set('consent_given', Boolean(v))}
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
          I consent to DevHorizon Technologies processing my information for recruitment purposes.
          {errors.consent_given && <span className="block text-xs text-destructive mt-1">{errors.consent_given}</span>}
        </Label>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit application
      </Button>
    </form>
  );
};
