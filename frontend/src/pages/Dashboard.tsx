
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Book, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Book as BookType } from '@/types';
import { getCurrentUser, getUserBooks, deleteBook } from '@/lib/dataService';
import Header from '@/components/Header';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchUserBooks = () => {
      const userBooks = getUserBooks(currentUser.id);
      setBooks(userBooks);
      
      const views = userBooks.reduce((acc, book) => acc + book.views, 0);
      setTotalViews(views);
    };
    
    fetchUserBooks();
  }, [currentUser.id]);

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
    setBooks(books.filter(book => book.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif font-bold">Meus Livros</h1>
          <Link to="/new-book">
            <Button>
              <Plus className="mr-1 h-4 w-4" /> Novo livro
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Livros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{books.length}</div>
                <Book className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                {books.length === 1 ? 'Livro publicado' : 'Livros publicados'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Visualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalViews}</div>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                {totalViews === 1 ? 'Visualização nos seus livros' : 'Visualizações nos seus livros'}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Livros</CardTitle>
              <CardDescription>
                Visualize, edite ou exclua seus livros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {books.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Você ainda não tem livros publicados</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece a vender seus livros agora mesmo.
                  </p>
                  <Link to="/new-book">
                    <Button>
                      <Plus className="mr-1 h-4 w-4" /> Adicionar livro
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Visualizações</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">
                            <Link to={`/book/${book.id}`} className="hover:underline">
                              {book.title}
                            </Link>
                          </TableCell>
                          <TableCell>{formatPrice(book.price)}</TableCell>
                          <TableCell>{book.views}</TableCell>
                          <TableCell>
                            {format(new Date(book.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link to={`/book/${book.id}`}>
                                <Button variant="ghost" size="icon" title="Ver">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/edit-book/${book.id}`}>
                                <Button variant="ghost" size="icon" title="Editar">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" title="Excluir">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o livro "{book.title}"?
                                      Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteBook(book.id)}
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
