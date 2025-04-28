
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send } from 'lucide-react';
import { getCurrentUser, sendMessage, getBookById } from '@/lib/dataService';
import { Book } from '@/types';

const NewMessage = () => {
  const { recipientId } = useParams<{ recipientId: string }>();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');
  const [message, setMessage] = useState('');
  const [relatedBook, setRelatedBook] = useState<Book | null>(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    if (bookId) {
      const book = getBookById(bookId);
      setRelatedBook(book || null);
    }
  }, [bookId]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !recipientId) return;
    
    try {
      const newMessage = sendMessage(
        currentUser.id,
        recipientId,
        message,
        bookId || undefined
      );
      
      // Get the conversation ID from newly created message
      const conversations = JSON.parse(localStorage.getItem('bookbazaar-conversations') || '[]');
      const conversation = conversations.find((c: any) => 
        c.participants.includes(currentUser.id) && 
        c.participants.includes(recipientId)
      );
      
      if (conversation) {
        navigate(`/messages/${conversation.id}`);
      } else {
        // Fallback to messages page if we can't find the conversation
        navigate('/messages');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-4">
          <Button
            variant="ghost"
            className="pl-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold">Nova Mensagem</h1>
        </div>
        
        {relatedBook && (
          <Card className="mb-4">
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
                <h3 className="font-medium">Sobre: {relatedBook.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(relatedBook.price)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <p className="mb-2">
              <span className="font-medium">Para:</span>{' '}
              {recipientId === 'user1' ? 'João Silva' : 
               recipientId === 'user2' ? 'Maria Oliveira' : 'Vendedor'}
            </p>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              required
              className="w-full"
              minLength={1}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!message.trim()}
            >
              <Send className="mr-2 h-4 w-4" /> Enviar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewMessage;
