
import React from 'react';
import BookCard from '@/components/BookCard';
import { Book } from '@/types';

interface BookGridProps {
  books: Book[];
  showSellerInfo?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, showSellerInfo = true }) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum livro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} showSellerInfo={showSellerInfo} />
      ))}
    </div>
  );
};

export default BookGrid;
