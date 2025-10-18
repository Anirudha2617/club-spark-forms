import { useState } from 'react';
import { Search, Users, Lock, Unlock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TopPillNav from '@/components/TopPillNav';
import { dummyClubs, api } from '@/lib/api';
import { toast } from 'sonner';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clubs] = useState(dummyClubs);

  const handleJoin = async (clubId: string, clubName: string) => {
    const result = await api.joinClub(clubId);
    if (result.success) {
      toast.success(`Joined ${clubName}!`);
    }
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <TopPillNav />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="space-y-6 mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">Discover Clubs</h1>
            <p className="text-muted-foreground text-lg">
              Find communities that match your interests
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search clubs by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg glass-elevated"
            />
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => (
            <Card
              key={club.id}
              className="overflow-hidden glass-elevated border-border/50 hover:scale-[1.02] transition-all duration-300 hover:glow-secondary animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={club.cover_url}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge
                  variant={club.privacy === 'public' ? 'secondary' : 'default'}
                  className="absolute top-3 right-3"
                >
                  {club.privacy === 'public' ? (
                    <Unlock className="w-3 h-3 mr-1" />
                  ) : (
                    <Lock className="w-3 h-3 mr-1" />
                  )}
                  {club.privacy}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {club.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {club.member_count} members
                    </span>
                  </div>

                  <Button
                    onClick={() => handleJoin(club.id, club.name)}
                    size="sm"
                    className="glow-primary"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No clubs found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
