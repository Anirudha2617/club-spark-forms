import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import TopPillNav from '@/components/TopPillNav';
import { currentUser } from '@/lib/api';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState(currentUser);
  const [displayName, setDisplayName] = useState(user.display_name);
  const [bio, setBio] = useState(user.bio);
  const [isDark, setIsDark] = useState(true);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    toast.success(`Switched to ${isDark ? 'light' : 'dark'} mode`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopPillNav />

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground text-lg">
            Manage your account settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="glass-elevated border-border/50 p-8 animate-fade-in">
            <div className="flex flex-col items-center text-center mb-8">
              <Avatar className="w-24 h-24 border-4 border-primary mb-4">
                <AvatarImage src={user.avatar_url} alt={user.display_name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.display_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.display_name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="glass min-h-[100px]"
                />
              </div>

              <Button onClick={handleSave} className="w-full glow-primary">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Settings Card */}
          <Card className="glass-elevated border-border/50 p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Sun className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      {isDark ? 'Dark mode' : 'Light mode'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  Switch
                </Button>
              </div>

              {/* Logout */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">Sign out</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full"
                >
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
