import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  BarChart3,
  Calendar,
  FileText,
  Pin,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TopPillNav from '@/components/TopPillNav';
import { dummyClubs, dummyMessages, dummyPolls, api } from '@/lib/api';
import { toast } from 'sonner';

const ClubChat = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);

  const club = dummyClubs.find((c) => c.id === clubId);

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Club not found</p>
      </div>
    );
  }

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMsg = await api.sendMessage(clubId!, message);
    setMessages([...messages, newMsg]);
    setMessage('');
    toast.success('Message sent');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopPillNav />

      {/* Chat Header */}
      <div className="glass-elevated border-b border-border/50 mt-20 sticky top-20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/clubs')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <Avatar className="w-10 h-10 border-2 border-border">
              <AvatarImage src={club.cover_url} alt={club.name} />
              <AvatarFallback>{club.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="font-bold text-lg">{club.name}</h2>
              <p className="text-sm text-muted-foreground">
                {club.member_count} members
              </p>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="animate-fade-in">
              {msg.type === 'text' && (
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 border-2 border-border">
                    <AvatarImage src={msg.sender.avatar_url} />
                    <AvatarFallback>
                      {msg.sender.display_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {msg.sender.display_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                      {msg.isPinned && (
                        <Pin className="w-3 h-3 text-gold fill-gold" />
                      )}
                    </div>
                    <Card className="glass p-3 inline-block max-w-2xl">
                      <p className="text-sm">{msg.content}</p>
                    </Card>
                  </div>
                </div>
              )}

              {msg.type === 'poll' && (
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 border-2 border-border">
                    <AvatarImage src={msg.sender.avatar_url} />
                    <AvatarFallback>
                      {msg.sender.display_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">
                        {msg.sender.display_name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Poll
                      </Badge>
                    </div>

                    <Card className="glass-elevated p-4 max-w-lg">
                      {dummyPolls
                        .filter((p) => p.id === msg.content_json?.poll_id)
                        .map((poll) => (
                          <div key={poll.id} className="space-y-3">
                            <h4 className="font-semibold">{poll.question}</h4>
                            <div className="space-y-2">
                              {poll.options.map((option) => {
                                const percentage =
                                  (option.votes / poll.total_votes) * 100;
                                return (
                                  <button
                                    key={option.id}
                                    className="w-full text-left"
                                    onClick={() =>
                                      api.votePoll(poll.id, option.id)
                                    }
                                  >
                                    <div className="relative overflow-hidden rounded-lg border border-border p-3 hover:bg-surface transition-colors">
                                      <div
                                        className="absolute inset-0 bg-primary/10"
                                        style={{ width: `${percentage}%` }}
                                      />
                                      <div className="relative flex justify-between">
                                        <span className="text-sm font-medium">
                                          {option.text}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                          {option.votes} ({percentage.toFixed(0)}%)
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {poll.total_votes} total votes
                            </p>
                          </div>
                        ))}
                    </Card>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="glass-elevated border-t border-border/50 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Attach image"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Create poll"
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Create event"
              >
                <Calendar className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Add form"
              >
                <FileText className="w-5 h-5" />
              </Button>
            </div>

            <Input
              type="text"
              placeholder="Message the club — @ to mention"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 glass"
            />

            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="rounded-full px-6 glow-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubChat;
