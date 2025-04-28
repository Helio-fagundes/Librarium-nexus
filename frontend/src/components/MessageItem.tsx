
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/lib/dataService';

interface MessageItemProps {
  message: Message;
  senderName: string;
  senderAvatar?: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  senderName,
  senderAvatar,
}) => {
  const currentUser = getCurrentUser();
  const isCurrentUserMessage = message.senderId === currentUser.id;
  
  const formattedTime = format(new Date(message.createdAt), 'HH:mm', { locale: ptBR });

  return (
    <div
      className={cn(
        "flex items-end gap-2 mb-4",
        isCurrentUserMessage ? "justify-end" : "justify-start"
      )}
    >
      {!isCurrentUserMessage && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-[75%] rounded-lg px-4 py-2 text-sm",
          isCurrentUserMessage
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <div className="space-y-1">
          {!isCurrentUserMessage && (
            <p className="text-xs font-medium">{senderName}</p>
          )}
          <p>{message.content}</p>
          <p className="text-xs opacity-70 text-right">{formattedTime}</p>
        </div>
      </div>
      
      {isCurrentUserMessage && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageItem;
