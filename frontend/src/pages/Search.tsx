
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllBooks, getAllCategories } from '@/lib/dataService';
import { Book } from '@/types';
import Header from '@/components/Header';
import BookGrid from '@/components/BookGrid';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const allBooks = getAllBooks();
    const allCategories = getAllCategories();
    
    setBooks(allBooks);
    setCategories(allCategories);
  }, []);
  
  useEffect(() => {
    if (query) {
      const filtered = books.filter(book => {
        const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase()) ||
          book.sellerName.toLowerCase().includes(query.toLowerCase());
          
        const matchesCategory = selectedCategory ? 
          book.categories.includes(selectedCategory) : true;
          
        return matchesQuery && matchesCategory;
      });
      
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [query, books, selectedCategory]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };
  
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <h1 className="text-3xl font-serif font-bold mb-6">Buscar Livros</h1>
        
        <form onSubmit={handleSearch} className="flex items-center mb-6">
          <Input
            type="search"
            placeholder="Título, descrição ou vendedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="ml-2">
            <SearchIcon className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </form>
        
        {query && (
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              {filteredBooks.length} resultados encontrados para "{query}"
            </p>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Filtrar por categoria:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(null)}
                >
                  Todas
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <BookGrid books={filteredBooks} />
          </div>
        )}
        
        {!query && (
          <div className="text-center py-10">
            <p className="text-lg mb-2">Digite algo para pesquisar</p>
            <p className="text-muted-foreground">
              Busque por título, descrição ou nome do vendedor
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
