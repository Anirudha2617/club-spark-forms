import { useState } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyEvents, api } from '@/lib/api';
import { toast } from 'sonner';

const Events = () => {
  const [filter, setFilter] = useState<'active' | 'all' | 'expired'>('active');
  const [events] = useState(dummyEvents);

  const filteredEvents =
    filter === 'all' ? events : events.filter((e) => e.status === filter);

  const handleRSVP = (eventId: string, response: 'going' | 'maybe' | 'not_going') => {
    api.rsvpEvent(eventId, response);
    toast.success(`RSVP updated to ${response.replace('_', ' ')}`);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Events & Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Stay connected with upcoming activities
          </p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="active" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="glass-elevated">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="expired">Past</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="glass-elevated border-border/50 overflow-hidden hover:scale-[1.02] transition-all animate-fade-in hover:glow-secondary"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                      {event.status === 'expired' && (
                        <Badge variant="secondary">Past</Badge>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(event.starts_at)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.attendees.going} going · {event.attendees.maybe} maybe
                        </span>
                      </div>
                    </div>

                    {/* RSVP Buttons */}
                    {event.status === 'active' && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="flex-1"
                          onClick={() => handleRSVP(event.id, 'going')}
                        >
                          Going
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleRSVP(event.id, 'maybe')}
                        >
                          Maybe
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1"
                          onClick={() => handleRSVP(event.id, 'not_going')}
                        >
                          Can't go
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <Card className="glass-elevated p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  {filter === 'active'
                    ? 'No active events at the moment'
                    : filter === 'expired'
                    ? 'No past events'
                    : 'No events available'}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
