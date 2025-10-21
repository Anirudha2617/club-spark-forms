import { useNavigate } from 'react-router-dom';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dummyClubs } from '@/lib/api';

const Clubs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">My Clubs</h1>
          <p className="text-muted-foreground text-lg">
            Your active communities
          </p>
        </div>

        {/* Clubs List */}
        <div className="space-y-3">
          {dummyClubs.map((club, index) => (
            <Card
              key={club.id}
              className="glass-elevated border-border/50 hover:bg-surface-elevated transition-all cursor-pointer animate-fade-in hover:scale-[1.01] hover:glow-secondary"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => navigate(`/club/${club.id}`)}
            >
              <div className="p-4 flex items-center gap-4">
                {/* Club Avatar */}
                <Avatar className="w-14 h-14 border-2 border-border">
                  <AvatarImage src={club.cover_url} alt={club.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {club.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Club Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">
                      {club.name}
                    </h3>
                    {club.unread_count && club.unread_count > 0 && (
                      <Badge variant="default" className="rounded-full px-2 py-0 text-xs">
                        {club.unread_count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {club.last_message}
                  </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground">
                    {club.last_message_time}
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {dummyClubs.length === 0 && (
          <Card className="glass-elevated p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No clubs yet</h3>
            <p className="text-muted-foreground">
              Discover and join clubs to start chatting
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Clubs;
