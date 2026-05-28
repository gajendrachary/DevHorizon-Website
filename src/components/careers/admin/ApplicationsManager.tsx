import { useEffect, useState } from 'react';
import { Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  years_experience: string;
  resume_file_url: string;
  status: string;
  submitted_at: string;
}

const STATUSES = ['new', 'shortlisted', 'interview', 'rejected', 'hired'];

export const ApplicationsManager = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_applications')
      .select('id, full_name, email, mobile, current_city, role_applied, application_type, years_experience, resume_file_url, status, submitted_at')
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

  const downloadResume = async (path: string) => {
    const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60);
    if (error || !data) {
      toast({ title: 'Failed', description: error?.message ?? 'No URL', variant: 'destructive' });
      return;
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Applications ({rows.length})</h2>
      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
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
            {rows.map((r) => (
              <TableRow key={r.id}>
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
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => downloadResume(r.resume_file_url)}>
                    <Download className="h-3.5 w-3.5 mr-1.5" />Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No applications yet.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
