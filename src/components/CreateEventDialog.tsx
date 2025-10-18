import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent: (eventData: {
    title: string;
    description: string;
    location: string;
    starts_at: string;
    ends_at: string;
  }) => void;
}

export const CreateEventDialog = ({ open, onOpenChange, onCreateEvent }: CreateEventDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');

  const handleSubmit = () => {
    if (title.trim() && startsAt && endsAt) {
      onCreateEvent({
        title,
        description,
        location,
        starts_at: startsAt,
        ends_at: endsAt,
      });
      setTitle('');
      setDescription('');
      setLocation('');
      setStartsAt('');
      setEndsAt('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-elevated border-border/50 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Create Event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Event Title</label>
            <Input
              type="text"
              placeholder="Event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="What's this event about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              type="text"
              placeholder="Where is it happening?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="glass"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Starts</label>
              <Input
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ends</label>
              <Input
                type="datetime-local"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                className="glass"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || !startsAt || !endsAt}
              className="glow-primary"
            >
              Create Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
