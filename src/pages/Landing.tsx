import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageSquare, Users, Calendar, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const Landing = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await api.login(email, password);
        if (result.success) {
          toast.success('Welcome back!');
          navigate('/discover');
        }
      } else {
        const result = await api.signup(email, password, displayName);
        if (result.success) {
          toast.success('Account created successfully!');
          navigate('/discover');
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left: Marketing */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-muted-foreground">
                Modern club communication
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Discover clubs,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-magenta">
                join conversations
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Connect with communities that matter. Chat, share, create polls, organize events,
              and grow together in one beautiful space.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: MessageSquare, label: 'Rich Chat', desc: 'Threads & media' },
                { icon: Users, label: 'Communities', desc: 'Find your tribe' },
                { icon: Calendar, label: 'Events', desc: 'Stay connected' },
              ].map((feature) => (
                <div key={feature.label} className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Auth Form */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <Card className="w-full max-w-md p-8 glass-elevated border-border/50">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">
                    {isLogin ? 'Welcome back' : 'Join us'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isLogin
                      ? 'Sign in to continue to your clubs'
                      : 'Create an account to get started'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Display Name</label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        className="glass"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="glass"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="glass"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full glow-primary"
                    disabled={loading}
                    size="lg"
                  >
                    {loading
                      ? 'Loading...'
                      : isLogin
                      ? 'Sign in'
                      : 'Create account'}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
