import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pin,
  MoreVertical,
  Reply,
  Forward,
  Smile,
  Copy,
  Trash,
} from 'lucide-react';
import { Message } from '@/lib/api';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onReply: (messageId: string) => void;
  onForward: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
}

const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

export const MessageBubble = ({
  message,
  isOwn,
  onReply,
  onForward,
  onReact,
}: MessageBubbleProps) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className={cn('flex gap-3 group', isOwn && 'flex-row-reverse')}>
      {!isOwn && (
        <Avatar className="w-10 h-10 border-2 border-border">
          <AvatarImage src={message.sender.avatar_url} />
          <AvatarFallback>
            {message.sender.display_name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn('flex-1 max-w-2xl', isOwn && 'flex flex-col items-end')}>
        {!isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {message.sender.display_name}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(message.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {message.isPinned && (
              <Pin className="w-3 h-3 text-gold fill-gold" />
            )}
          </div>
        )}

        <div className="relative">
          <Card
            className={cn(
              'p-3 inline-block relative group/msg',
              isOwn
                ? 'bg-primary text-primary-foreground'
                : 'glass'
            )}
          >
            <p className="text-sm">{message.content}</p>

            {/* Message Actions */}
            <div
              className={cn(
                'absolute -top-3 flex gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity',
                isOwn ? 'left-0' : 'right-0'
              )}
            >
              <Button
                variant="secondary"
                size="icon"
                className="h-6 w-6 rounded-full shadow-lg"
                onClick={() => setShowReactions(!showReactions)}
              >
                <Smile className="w-3 h-3" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-6 w-6 rounded-full shadow-lg"
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isOwn ? 'start' : 'end'}>
                  <DropdownMenuItem onClick={() => onReply(message.id)}>
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onForward(message.id)}>
                    <Forward className="w-4 h-4 mr-2" />
                    Forward
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </DropdownMenuItem>
                  {isOwn && (
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>

          {/* Reaction Picker */}
          {showReactions && (
            <div className="absolute -bottom-10 left-0 glass-elevated rounded-full px-2 py-1 flex gap-1 shadow-lg animate-scale-in z-10">
              {reactionEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReact(message.id, emoji);
                    setShowReactions(false);
                  }}
                  className="hover:scale-125 transition-transform text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Existing Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {message.reactions.map((reaction, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => onReact(message.id, reaction.emoji)}
                >
                  {reaction.emoji} {reaction.users.length}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {isOwn && (
          <span className="text-xs text-muted-foreground mt-1">
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
    </div>
  );
};
