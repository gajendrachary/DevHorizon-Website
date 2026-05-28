import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/common/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, LogOut, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { OpeningsManager } from '@/components/careers/admin/OpeningsManager';
import { ApplicationsManager } from '@/components/careers/admin/ApplicationsManager';

const CareersAdmin = () => {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!user) { setIsAdmin(null); return; }
      setChecking(true);
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['admin', 'recruiter']);
      setIsAdmin((data ?? []).some((r) => r.role === 'admin' || r.role === 'recruiter'));
      setChecking(false);
    };
    check();
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await signIn(email, password);
    setSigningIn(false);
    if (error) toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
  };

  return (
    <Layout>
      <SEO title="Careers Admin — DevHorizon" description="Internal." noindex />
      <section className="container-swiss py-14 min-h-[80vh]">
        {!user || authLoading ? (
          <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5" />
              <h1 className="text-xl font-bold">Careers admin sign in</h1>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={signingIn}>
                {signingIn && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Sign in
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Admin accounts are provisioned by the team.
              </p>
            </form>
          </div>
        ) : checking ? (
          <Loader2 className="h-6 w-6 animate-spin mx-auto mt-20" />
        ) : !isAdmin ? (
          <div className="max-w-md mx-auto text-center rounded-xl border border-border bg-card p-10">
            <h1 className="text-xl font-bold mb-3">Access denied</h1>
            <p className="text-muted-foreground mb-6">Your account does not have careers admin access.</p>
            <Button variant="outline" onClick={async () => { await signOut(); navigate('/careers/admin'); }}>
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Careers admin</h1>
                <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
              </div>
              <Button variant="outline" onClick={() => signOut()}><LogOut className="h-4 w-4 mr-2" />Sign out</Button>
            </div>
            <Tabs defaultValue="openings">
              <TabsList>
                <TabsTrigger value="openings">Openings</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="openings" className="mt-6"><OpeningsManager /></TabsContent>
              <TabsContent value="applications" className="mt-6"><ApplicationsManager /></TabsContent>
            </Tabs>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CareersAdmin;
