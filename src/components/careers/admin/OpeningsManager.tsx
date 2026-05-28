import { useEffect, useState } from 'react';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openingSchema } from '@/lib/careersSchemas';

interface Opening {
  id: string;
  title: string;
  department: string;
  job_type: string;
  experience_level: string;
  location: string;
  work_mode: string;
  skills: string[];
  description: string;
  eligibility_criteria: string | null;
  responsibilities: string | null;
  status: string;
  created_at: string;
}

const empty = {
  title: '', department: '', job_type: 'Full-time', experience_level: '',
  location: 'Bengaluru, India', work_mode: 'Hybrid', skills: '',
  description: '', eligibility_criteria: '', responsibilities: '', status: 'open',
};

export const OpeningsManager = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Opening | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast({ title: 'Failed to load', description: error.message, variant: 'destructive' });
    else setRows((data ?? []) as Opening[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const startEdit = (r: Opening) => {
    setEditing(r);
    setForm({
      title: r.title, department: r.department, job_type: r.job_type,
      experience_level: r.experience_level, location: r.location, work_mode: r.work_mode,
      skills: r.skills.join(', '), description: r.description,
      eligibility_criteria: r.eligibility_criteria ?? '',
      responsibilities: r.responsibilities ?? '',
      status: r.status,
    });
    setOpen(true);
  };

  const save = async () => {
    const parsed = openingSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: 'Check form', description: parsed.error.errors[0]?.message ?? 'Invalid', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      ...parsed.data,
      skills: parsed.data.skills.split(',').map((s) => s.trim()).filter(Boolean),
      eligibility_criteria: parsed.data.eligibility_criteria || null,
      responsibilities: parsed.data.responsibilities || null,
    };
    const op = editing
      ? supabase.from('job_openings').update(payload).eq('id', editing.id)
      : supabase.from('job_openings').insert([payload]);
    const { error } = await op;
    setSaving(false);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: editing ? 'Updated' : 'Created' });
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this opening?')) return;
    const { error } = await supabase.from('job_openings').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Job openings ({rows.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate}><Plus className="h-4 w-4 mr-2" />New opening</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit opening' : 'Create opening'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Department</Label><Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></div>
                <div>
                  <Label>Job type</Label>
                  <Select value={form.job_type} onValueChange={(v) => setForm({ ...form, job_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Experience level</Label><Input value={form.experience_level} onChange={(e) => setForm({ ...form, experience_level: e.target.value })} placeholder="Fresher, 2-5 yrs" /></div>
                <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div>
                  <Label>Work mode</Label>
                  <Select value={form.work_mode} onValueChange={(v) => setForm({ ...form, work_mode: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Onsite">Onsite</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Skills (comma-separated)</Label><Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><Label>Eligibility criteria</Label><Textarea rows={2} value={form.eligibility_criteria} onChange={(e) => setForm({ ...form, eligibility_criteria: e.target.value })} /></div>
              <div><Label>Responsibilities</Label><Textarea rows={2} value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} /></div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editing ? 'Save changes' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{r.department}</TableCell>
                  <TableCell>{r.job_type}</TableCell>
                  <TableCell>{r.work_mode}</TableCell>
                  <TableCell><Badge variant={r.status === 'open' ? 'default' : 'secondary'}>{r.status}</Badge></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(r)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="outline" onClick={() => remove(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
