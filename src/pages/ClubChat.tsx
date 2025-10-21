import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  BarChart3,
  Calendar,
  FileText,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dummyClubs, dummyMessages, dummyPolls, dummyEvents, dummyForms, api, currentUser } from '@/lib/api';
import { toast } from 'sonner';
import { ImageUploadDialog } from '@/components/ImageUploadDialog';
import { CreatePollDialog } from '@/components/CreatePollDialog';
import { CreateEventDialog } from '@/components/CreateEventDialog';
import { CreateFormDialog } from '@/components/CreateFormDialog';
import { ClubDetailsSheet } from '@/components/ClubDetailsSheet';
import { MessageBubble } from '@/components/MessageBubble';
import { CompactEventCard, CompactPollCard, CompactFormCard } from '@/components/CompactCards';

const ClubChat = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pollDialogOpen, setPollDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [clubDetailsOpen, setClubDetailsOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

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

  const handleImageUpload = (imageUrl: string) => {
    toast.success('Image uploaded!');
    // In a real app, this would send the image as a message
  };

  const handleCreatePoll = async (question: string, options: string[]) => {
    await api.createPoll(clubId!, question, options);
    toast.success('Poll created!');
    // Refresh messages to show the new poll
  };

  const handleCreateEvent = async (eventData: any) => {
    await api.createEvent(clubId!, eventData);
    toast.success('Event created!');
  };

  const handleCreateForm = async (formData: any) => {
    await api.createForm(clubId!, formData);
    toast.success('Form created!');
  };

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
    toast.info('Replying to message');
  };

  const handleForward = (messageId: string) => {
    toast.info('Forward feature coming soon!');
  };

  const handleReact = (messageId: string, emoji: string) => {
    toast.success(`Reacted with ${emoji}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="glass-elevated border-b border-border/50 mt-20 sticky top-20 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/clubs')}
              className="rounded-full h-9 w-9"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <button
              onClick={() => setClubDetailsOpen(true)}
              className="flex items-center gap-3 flex-1 hover:bg-surface/50 rounded-xl p-2 transition-colors"
            >
              <Avatar className="w-10 h-10 border-2 border-border">
                <AvatarImage src={club.cover_url} alt={club.name} />
                <AvatarFallback>{club.name.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-left">
                <h2 className="font-bold text-base">{club.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {club.member_count} members
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-surface/30">
        <div className="container mx-auto px-4 py-6 max-w-4xl space-y-4">
          {messages.map((msg) => {
            const isOwn = msg.sender.id === currentUser.id;

            return (
              <div key={msg.id} className="animate-fade-in">
                {msg.type === 'text' && (
                  <MessageBubble
                    message={msg}
                    isOwn={isOwn}
                    onReply={handleReply}
                    onForward={handleForward}
                    onReact={handleReact}
                  />
                )}

                {msg.type === 'poll' && (
                  <div className={isOwn ? 'ml-12' : 'mr-12'}>
                    {dummyPolls
                      .filter((p) => p.id === msg.content_json?.poll_id)
                      .map((poll) => (
                        <CompactPollCard
                          key={poll.id}
                          poll={poll}
                          onVote={(pollId, optionId) =>
                            api.votePoll(pollId, optionId)
                          }
                        />
                      ))}
                  </div>
                )}

                {msg.type === 'event' && (
                  <div className={isOwn ? 'ml-12' : 'mr-12'}>
                    {dummyEvents
                      .filter((e) => e.id === msg.content_json?.event_id)
                      .map((event) => (
                        <CompactEventCard key={event.id} event={event} />
                      ))}
                  </div>
                )}

                {msg.type === 'form' && (
                  <div className={isOwn ? 'ml-12' : 'mr-12'}>
                    {dummyForms
                      .filter((f) => f.id === msg.content_json?.form_id)
                      .map((form) => (
                        <CompactFormCard key={form.id} form={form} />
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div className="glass-elevated border-t border-border/50 sticky bottom-0">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          {replyingTo && (
            <div className="flex items-center justify-between mb-2 glass rounded-lg p-2">
              <span className="text-xs text-muted-foreground">
                Replying to message
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setReplyingTo(null)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Attach image"
                onClick={() => setImageDialogOpen(true)}
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Create poll"
                onClick={() => setPollDialogOpen(true)}
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Create event"
                onClick={() => setEventDialogOpen(true)}
              >
                <Calendar className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                title="Add form"
                onClick={() => setFormDialogOpen(true)}
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

      {/* Dialogs */}
      <ImageUploadDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onUpload={handleImageUpload}
      />
      <CreatePollDialog
        open={pollDialogOpen}
        onOpenChange={setPollDialogOpen}
        onCreatePoll={handleCreatePoll}
      />
      <CreateEventDialog
        open={eventDialogOpen}
        onOpenChange={setEventDialogOpen}
        onCreateEvent={handleCreateEvent}
      />
      <CreateFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onCreateForm={handleCreateForm}
      />
      <ClubDetailsSheet
        club={club}
        open={clubDetailsOpen}
        onOpenChange={setClubDetailsOpen}
      />
    </div>
  );
};

export default ClubChat;
