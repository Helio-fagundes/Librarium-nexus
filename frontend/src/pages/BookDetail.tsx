
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import { Book, getCurrentUser, getBookById, incrementBookView } from '@/lib/dataService';
import { Edit, MessageSquare } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    if (id) {
      const fetchBook = () => {
        const bookData = getBookById(id);
        if (bookData) {
          setBook(bookData);
          
          // Increment view count if the viewer is not the book owner
          if (bookData.sellerId !== currentUser.id) {
            incrementBookView(id);
          }
        }
        setIsLoading(false);
      };
      
      fetchBook();
    }
  }, [id, currentUser.id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex justify-center items-center h-64">
            <p>Carregando...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
            <p className="mb-6">O livro que você está procurando não existe ou foi removido.</p>
            <Link to="/">
              <Button>Voltar para a página inicial</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const isOwner = book.sellerId === currentUser.id;
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return 'Novo';
      case 'like-new': return 'Como novo';
      case 'good': return 'Bom';
      case 'fair': return 'Regular';
      case 'poor': return 'Desgastado';
      default: return condition;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-4">
          <Link to="/" className="text-sm hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div>
            <div className="aspect-[2/3] w-full overflow-hidden rounded-md border bg-muted">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-muted-foreground">Sem imagem</span>
                </div>
              )}
            </div>
            
            {isOwner && (
              <div className="mt-4">
                <Link to={`/edit-book/${book.id}`}>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Editar livro
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-serif font-bold">{book.title}</h1>
                <div className="flex flex-wrap gap-1 mt-2">
                  {book.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatPrice(book.price)}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center mb-6">
              <Badge variant="secondary" className="mr-2">
                {getConditionLabel(book.condition)}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {book.views} {book.views === 1 ? 'visualização' : 'visualizações'}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Descrição</h2>
              <p className="whitespace-pre-line">{book.description}</p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src="/placeholder.svg" alt={book.sellerName} />
                  <AvatarFallback>{book.sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{book.sellerName}</p>
                  <p className="text-sm text-muted-foreground">Vendedor</p>
                </div>
              </div>
              
              {!isOwner && (
                <Link to={`/messages/new/${book.sellerId}?bookId=${book.id}`}>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" /> Enviar mensagem
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
