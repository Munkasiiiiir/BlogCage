import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { PenSquare, ArrowRight, FileText, Shield, Zap } from 'lucide-react';

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PenSquare className="h-6 w-6 text-accent" />
            <span className="font-display text-xl font-semibold text-foreground">BlogCage</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth?mode=login">Log in</Link>
            </Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in">
              Your thoughts,
              <br />
              <span className="text-accent">beautifully organized</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              BlogCage is the simple, elegant way to write, manage, and share your blog posts. 
              Focus on what matters — your ideas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 w-full sm:w-auto"
                asChild
              >
                <Link to="/auth?mode=signup">
                  Start Writing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link to="/auth?mode=login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-24 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Simple Editor</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Write without distractions. A clean, focused writing experience.
              </p>
            </div>

            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Secure & Private</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your blogs are safe and only visible to you until you decide otherwise.
              </p>
            </div>

            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Fast & Responsive</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage your content on any device with a lightning-fast interface.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BlogCage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
