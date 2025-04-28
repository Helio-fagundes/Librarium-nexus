
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '@/components/Header';
import { getCurrentUser, getConversations } from '@/lib/dataService';
import { Conversation } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Book } from 'lucide-react';

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const fetchConversations = () => {
      const userConversations = getConversations(currentUser.id);
      // Sort by most recent
      userConversations.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
      setConversations(userConversations);
    };
    
    fetchConversations();
  }, [currentUser.id]);
  
  const getOtherParticipantId = (conversation: Conversation) => {
    return conversation.participants.find(id => id !== currentUser.id) || '';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, "'Hoje,' HH:mm", { locale: ptBR });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return format(date, "'Ontem,' HH:mm", { locale: ptBR });
    } else {
      return format(date, "dd/MM/yyyy, HH:mm", { locale: ptBR });
    }
  };
  
  // Mock usernames for demo (in a real app, you would fetch user details)
  const getUserName = (userId: string) => {
    if (userId === 'user1') return 'João Silva';
    if (userId === 'user2') return 'Maria Oliveira';
    if (userId === 'currentUser') return 'Você';
    return 'Usuário';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <h1 className="text-3xl font-serif font-bold mb-6">Mensagens</h1>
        
        {conversations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg mb-2">Você ainda não tem conversas</p>
            <p className="text-muted-foreground mb-6">
              Quando você enviar ou receber mensagens, elas aparecerão aqui.
            </p>
            <Link to="/">
              <Button>Explorar livros</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => {
              const otherUserId = getOtherParticipantId(conversation);
              const otherUserName = getUserName(otherUserId);
              const hasUnreadMessages = conversation.lastMessage && !conversation.lastMessage.read && 
                conversation.lastMessage.receiverId === currentUser.id;
                
              return (
                <div
                  key={conversation.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    hasUnreadMessages ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted'
                  }`}
                  onClick={() => navigate(`/messages/${conversation.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={otherUserName} />
                        <AvatarFallback>{otherUserName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`font-medium ${hasUnreadMessages ? 'text-primary font-semibold' : ''}`}>
                          {otherUserName}
                        </p>
                        {conversation.lastMessage && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {conversation.lastMessage.senderId === currentUser.id ? 'Você: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {conversation.lastMessage && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(conversation.lastMessage.createdAt)}
                        </p>
                      )}
                      {conversation.bookId && (
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Book className="h-3 w-3 mr-1" />
                          <span>Sobre um livro</span>
                        </div>
                      )}
                      {hasUnreadMessages && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
