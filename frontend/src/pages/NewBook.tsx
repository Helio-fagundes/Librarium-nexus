
import Header from '@/components/Header';
import BookForm from '@/components/BookForm';

const NewBook = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold">Vender um livro</h1>
          <p className="text-muted-foreground">
            Preencha os detalhes do livro que você deseja vender.
          </p>
        </div>
        
        <BookForm />
      </main>
    </div>
  );
};

export default NewBook;
