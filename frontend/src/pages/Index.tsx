
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllBooks, getAllCategories } from '@/lib/dataService';
import { Book } from '@/types';
import Header from '@/components/Header';
import BookGrid from '@/components/BookGrid';
import { Badge } from '@/components/ui/badge';
import { Plus, Book as BookIcon } from 'lucide-react';

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = () => {
      const allBooks = getAllBooks();
      const allCategories = getAllCategories();
      
      setBooks(allBooks);
      setCategories(allCategories);
    };
    
    fetchBooks();
  }, []);
  
  const filteredBooks = selectedCategory
    ? books.filter(book => book.categories.includes(selectedCategory))
    : books;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-serif font-bold">
              BookBazaar
            </h1>
            <Link to="/new-book">
              <Button className="mt-2 sm:mt-0">
                <Plus className="mr-1 h-4 w-4" /> Vender livro
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white p-8 rounded-lg mb-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Compre e venda livros de forma fácil
              </h2>
              <p className="mb-6 text-white/90">
                Encontre livros especiais ou venda os que já leu. 
                Conecte-se diretamente com compradores e vendedores da sua região.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/new-book">
                  <Button variant="secondary" className="text-secondary-foreground">
                    <BookIcon className="mr-1 h-4 w-4" /> Comece a vender
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Ver meu dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                Todas
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">
              {selectedCategory ? `Livros em ${selectedCategory}` : 'Livros disponíveis'}
            </h3>
            <BookGrid books={filteredBooks} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
