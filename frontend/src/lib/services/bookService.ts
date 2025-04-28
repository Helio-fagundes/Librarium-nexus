
import { Book } from '@/types';
import { BOOKS_KEY } from '../mockData';
import { toast } from "@/components/ui/sonner";

export const getAllBooks = (): Book[] => {
  const booksData = localStorage.getItem(BOOKS_KEY);
  if (!booksData) return [];
  return JSON.parse(booksData);
};

export const getBookById = (id: string): Book | undefined => {
  const books = getAllBooks();
  return books.find(book => book.id === id);
};

export const getUserBooks = (userId: string): Book[] => {
  const books = getAllBooks();
  return books.filter(book => book.sellerId === userId);
};

export const addBook = (book: Omit<Book, 'id' | 'createdAt' | 'views'>): Book => {
  const books = getAllBooks();
  const newBook: Book = {
    ...book,
    id: `book${Date.now()}`,
    createdAt: new Date().toISOString(),
    views: 0
  };
  
  localStorage.setItem(BOOKS_KEY, JSON.stringify([...books, newBook]));
  toast.success("Livro adicionado com sucesso!");
  return newBook;
};

export const updateBook = (id: string, bookData: Partial<Book>): Book => {
  const books = getAllBooks();
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    throw new Error('Livro não encontrado');
  }
  
  const updatedBook = {
    ...books[bookIndex],
    ...bookData
  };
  
  books[bookIndex] = updatedBook;
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  toast.success("Livro atualizado com sucesso!");
  
  return updatedBook;
};

export const deleteBook = (id: string): void => {
  const books = getAllBooks();
  const filteredBooks = books.filter(book => book.id !== id);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(filteredBooks));
  toast.success("Livro removido com sucesso!");
};

export const incrementBookView = (id: string): void => {
  const books = getAllBooks();
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      views: (books[bookIndex].views || 0) + 1
    };
    
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }
};

export const getAllCategories = (): string[] => {
  const books = getAllBooks();
  const categoriesSet = new Set<string>();
  
  books.forEach(book => {
    book.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};
