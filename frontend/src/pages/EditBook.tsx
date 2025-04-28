
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BookForm from '@/components/BookForm';
import { Book, getBookById, getCurrentUser } from '@/lib/dataService';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    if (id) {
      const fetchBook = () => {
        const bookData = getBookById(id);
        
        if (!bookData) {
          setError('Livro não encontrado');
        } else if (bookData.sellerId !== currentUser.id) {
          setError('Você não tem permissão para editar este livro');
        } else {
          setBook(bookData);
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
  
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Erro</h1>
            <p className="mb-6">{error}</p>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Voltar
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold">Editar Livro</h1>
          <p className="text-muted-foreground">
            Atualize os detalhes do seu livro.
          </p>
        </div>
        
        {book && <BookForm book={book} isEditing={true} />}
      </main>
    </div>
  );
};

export default EditBook;
