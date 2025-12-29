import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { SEO } from '@/components/common/SEO';
import { supabase } from '@/integrations/supabase/client';
import { 
  LogOut, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Clock, 
  DollarSign,
  MessageSquare,
  User,
  Loader2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { format } from 'date-fns';

interface FormSubmission {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  services: string[] | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  created_at: string;
  metadata: unknown;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  reviewed: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  contacted: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
};

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSubmissions();
    }
  }, [user, isAdmin]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error fetching submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load form submissions.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => 
        prev.map(s => s.id === id ? { ...s, status } : s)
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, status } : null);
      }
      
      toast({
        title: 'Status Updated',
        description: `Submission marked as ${status}.`,
      });
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus);

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    reviewed: submissions.filter(s => s.status === 'reviewed').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !authLoading) {
    return (
      <Layout>
        <SEO title="Access Denied | DevHub Technologies" description="" noindex={true} />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Admin Dashboard | DevHub Technologies"
        description="Manage form submissions and client inquiries"
        noindex={true}
      />
      
      <section className="section-padding bg-secondary/30 min-h-screen">
        <div className="container-swiss">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">📊 Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage client form submissions</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchSubmissions}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total, icon: Inbox, color: 'text-foreground' },
              { label: 'New', value: stats.new, icon: AlertCircle, color: 'text-blue-600' },
              { label: 'Reviewed', value: stats.reviewed, icon: Clock, color: 'text-yellow-600' },
              { label: 'Contacted', value: stats.contacted, icon: Phone, color: 'text-purple-600' },
              { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border p-4 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'new', 'reviewed', 'contacted', 'completed'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Submissions List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Submissions ({filteredSubmissions.length})</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="bg-card border border-border p-8 rounded-xl text-center">
                  <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No submissions found</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredSubmissions.map((submission, index) => (
                    <motion.button
                      key={submission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`w-full text-left bg-card border p-4 rounded-xl transition-all hover:border-primary/50 ${
                        selectedSubmission?.id === submission.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="font-medium truncate">{submission.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3 shrink-0" />
                            <span className="truncate">{submission.email}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(submission.created_at), 'MMM d, yyyy h:mm a')}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border shrink-0 ${statusColors[submission.status] || ''}`}>
                          {submission.status}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Submission Detail */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              
              {selectedSubmission ? (
                <motion.div
                  key={selectedSubmission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border p-6 rounded-xl"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold">{selectedSubmission.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {selectedSubmission.form_type} Request
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[selectedSubmission.status] || ''}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="grid gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <a href={`mailto:${selectedSubmission.email}`} className="text-sm hover:text-primary">
                          {selectedSubmission.email}
                        </a>
                      </div>
                    </div>

                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <a href={`tel:${selectedSubmission.phone}`} className="text-sm hover:text-primary">
                            {selectedSubmission.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {selectedSubmission.company && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Company</p>
                          <p className="text-sm">{selectedSubmission.company}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  {selectedSubmission.services && selectedSubmission.services.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.services.map((service) => (
                          <span 
                            key={service} 
                            className="text-xs bg-secondary px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedSubmission.budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="text-sm font-medium">{selectedSubmission.budget}</p>
                        </div>
                      </div>
                    )}
                    {selectedSubmission.timeline && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Timeline</p>
                          <p className="text-sm font-medium capitalize">{selectedSubmission.timeline}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {selectedSubmission.message && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Message</p>
                      </div>
                      <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium mb-3">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {['new', 'reviewed', 'contacted', 'completed'].map((status) => (
                        <Button
                          key={status}
                          variant={selectedSubmission.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateStatus(selectedSubmission.id, status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-card border border-border p-8 rounded-xl text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
