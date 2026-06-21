import { useEffect, useState } from 'react';
import { Loader2, Download, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Application {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  current_city: string;
  role_applied: string;
  application_type: string;
  highest_qualification: string;
  college_university: string;
  years_experience: string;
  skills: string;
  short_intro: string;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  resume_file_url: string;
  availability: string | null;
  expected_compensation: string | null;
  status: string;
  submitted_at: string;
}

const STATUSES = ['new', 'shortlisted', 'interview', 'rejected', 'hired'];

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
    <div className="text-sm break-words">{value && value.trim() ? value : <span className="text-muted-foreground">—</span>}</div>
  </div>
);

const LinkField = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
    {value && value.trim() ? (
      <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1 break-all">
        {value}<ExternalLink className="h-3 w-3 flex-shrink-0" />
      </a>
    ) : <div className="text-sm text-muted-foreground">—</div>}
  </div>
);

export const ApplicationsManager = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) toast({ title: 'Failed to load', description: error.message, variant: 'destructive' });
    else setRows((data ?? []) as Application[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('job_applications').update({ status }).eq('id', id);
    if (error) toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    else { setRows((r) => r.map((x) => x.id === id ? { ...x, status } : x)); toast({ title: 'Status updated' }); }
  };

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const downloadResume = async (path: string) => {
    const { data, error } = await supabase.storage.from('resumes').download(path);
    if (error || !data) {
      toast({ title: 'Failed', description: error?.message ?? 'No file', variant: 'destructive' });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = path.split('/').pop() ?? 'resume';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Applications ({rows.length})</h2>
      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Resume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const isOpen = expanded.has(r.id);
              return (
                <>
                  <TableRow key={r.id} className="cursor-pointer" onClick={() => toggle(r.id)}>
                    <TableCell>{isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{format(new Date(r.submitted_at), 'd MMM, HH:mm')}</TableCell>
                    <TableCell className="font-medium">
                      {r.full_name}
                      <div className="text-xs text-muted-foreground">{r.current_city} · {r.years_experience}</div>
                    </TableCell>
                    <TableCell>
                      {r.role_applied}
                      <div className="text-xs text-muted-foreground">{r.application_type}</div>
                    </TableCell>
                    <TableCell className="text-xs">{r.email}</TableCell>
                    <TableCell className="text-xs">{r.mobile}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline" onClick={() => downloadResume(r.resume_file_url)}>
                        <Download className="h-3.5 w-3.5 mr-1.5" />Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow key={`${r.id}-details`} className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={8} className="p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Personal</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Field label="Full name" value={r.full_name} />
                              <Field label="Email" value={r.email} />
                              <Field label="Mobile" value={r.mobile} />
                              <Field label="Current city" value={r.current_city} />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Role</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Field label="Role applied for" value={r.role_applied} />
                              <Field label="Application type" value={r.application_type} />
                              <Field label="Availability (notice period)" value={r.availability} />
                              <Field label="Expected compensation" value={r.expected_compensation} />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Education & Experience</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Field label="Highest qualification" value={r.highest_qualification} />
                              <Field label="College / university" value={r.college_university} />
                              <Field label="Years of experience" value={r.years_experience} />
                              <Field label="Key skills" value={r.skills} />
                            </div>
                            <div className="mt-4">
                              <Field label="Short intro" value={r.short_intro} />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Links</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <LinkField label="GitHub" value={r.github_url} />
                              <LinkField label="LinkedIn" value={r.linkedin_url} />
                              <LinkField label="Portfolio" value={r.portfolio_url} />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No applications yet.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
