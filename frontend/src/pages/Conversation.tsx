
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getCurrentUser, getConversation, getMessagesByConversation, sendMessage, markMessagesAsRead, getBookById } from '@/lib/dataService';
import { Message, Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MessageItem from '@/components/MessageItem';
import { ArrowLeft, Send } from 'lucide-react';

const Conversation = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [relatedBook, setRelatedBook] = useState<Book | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    if (id) {
      const fetchMessages = () => {
        const conversation = getConversation(id);
        
        if (!conversation) {
          navigate('/messages');
          return;
        }
        
        // Check if user is part of this conversation
        if (!conversation.participants.includes(currentUser.id)) {
          navigate('/messages');
          return;
        }
        
        const conversationMessages = getMessagesByConversation(id);
        setMessages(conversationMessages);
        
        // Mark messages as read
        markMessagesAsRead(id, currentUser.id);
        
        // Fetch related book if any
        if (conversation.bookId) {
          const book = getBookById(conversation.bookId);
          setRelatedBook(book || null);
        }
      };
      
      fetchMessages();
      
      // Poll for new messages every few seconds
      const intervalId = setInterval(fetchMessages, 3000);
      
      return () => clearInterval(intervalId);
    }
  }, [id, currentUser.id, navigate]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !id) return;
    
    const conversation = getConversation(id);
    
    if (!conversation) return;
    
    const receiverId = conversation.participants.find(
      (participantId) => participantId !== currentUser.id
    );
    
    if (!receiverId) return;
    
    const sentMessage = sendMessage(
      currentUser.id,
      receiverId,
      newMessage,
      conversation.bookId
    );
    
    setMessages([...messages, sentMessage]);
    setNewMessage('');
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
        <div className="mb-4">
          <Button
            variant="ghost"
            className="pl-0"
            onClick={() => navigate('/messages')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para mensagens
          </Button>
        </div>
        
        {relatedBook && (
          <Link to={`/book/${relatedBook.id}`}>
            <Card className="mb-4 hover:bg-accent transition-colors">
              <CardContent className="p-4 flex items-center">
                <div className="w-12 h-16 bg-muted rounded overflow-hidden mr-3">
                  {relatedBook.coverImage ? (
                    <img 
                      src={relatedBook.coverImage} 
                      alt={relatedBook.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Conversa sobre: {relatedBook.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    }).format(relatedBook.price)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
        
        <div className="bg-card rounded-lg border shadow-sm flex flex-col h-[60vh]">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Inicie uma conversa...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    senderName={getUserName(message.senderId)}
                  />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form 
            onSubmit={handleSendMessage} 
            className="p-4 border-t flex gap-2"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Conversation;
