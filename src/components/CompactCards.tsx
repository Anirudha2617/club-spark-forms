import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, BarChart3, FileText, Users } from 'lucide-react';
import { Event, Poll, Form } from '@/lib/api';

interface CompactEventCardProps {
  event: Event;
}

export const CompactEventCard = ({ event }: CompactEventCardProps) => {
  return (
    <Card className="glass-elevated p-4 hover:scale-102 transition-transform cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm truncate">{event.title}</h4>
            <Badge variant="secondary" className="text-xs">Event</Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {event.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(event.starts_at).toLocaleDateString()}
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Going
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              Maybe
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface CompactPollCardProps {
  poll: Poll;
  onVote: (pollId: string, optionId: string) => void;
}

export const CompactPollCard = ({ poll, onVote }: CompactPollCardProps) => {
  return (
    <Card className="glass-elevated p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-semibold text-sm">{poll.question}</h4>
            <Badge variant="secondary" className="text-xs">Poll</Badge>
          </div>
          <div className="space-y-2">
            {poll.options.map((option) => {
              const percentage = poll.total_votes > 0
                ? (option.votes / poll.total_votes) * 100
                : 0;
              return (
                <button
                  key={option.id}
                  className="w-full text-left"
                  onClick={() => onVote(poll.id, option.id)}
                >
                  <div className="relative overflow-hidden rounded-lg border border-border p-2 hover:bg-surface transition-colors">
                    <div
                      className="absolute inset-0 bg-primary/10"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex justify-between text-xs">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-muted-foreground">
                        {option.votes} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {poll.total_votes} total votes
          </p>
        </div>
      </div>
    </Card>
  );
};

interface CompactFormCardProps {
  form: Form;
}

export const CompactFormCard = ({ form }: CompactFormCardProps) => {
  return (
    <Card className="glass-elevated p-4 hover:scale-102 transition-transform cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm truncate">{form.title}</h4>
            <Badge variant="secondary" className="text-xs">Form</Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {form.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {form.questions.length} questions
            </div>
            {form.response_limit && (
              <span>Limit: {form.response_limit}</span>
            )}
          </div>
          <Button size="sm" className="h-7 text-xs w-full">
            Fill Form
          </Button>
        </div>
      </div>
    </Card>
  );
};
