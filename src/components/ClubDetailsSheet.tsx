import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, BarChart3, FileText, Bell, LogOut } from 'lucide-react';
import { Club } from '@/lib/api';

interface ClubDetailsSheetProps {
  club: Club;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClubDetailsSheet = ({ club, open, onOpenChange }: ClubDetailsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-elevated border-l border-border/50 w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Club Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Club Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24 border-4 border-border">
              <AvatarImage src={club.cover_url} alt={club.name} />
              <AvatarFallback>{club.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{club.name}</h2>
              <p className="text-muted-foreground mt-1">{club.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{club.category}</Badge>
              {club.is_private && <Badge variant="outline">Private</Badge>}
            </div>
          </div>

          {/* Stats */}
          <div className="glass rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Members</span>
              </div>
              <span className="font-semibold">{club.member_count}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Events</span>
              </div>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Polls</span>
              </div>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Forms</span>
              </div>
              <span className="font-semibold">2</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive" size="lg">
              <LogOut className="w-4 h-4 mr-2" />
              Leave Club
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
