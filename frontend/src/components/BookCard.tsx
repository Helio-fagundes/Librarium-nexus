
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  showSellerInfo?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showSellerInfo = true }) => {
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

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-emerald-100 text-emerald-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-amber-100 text-amber-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="book-card animate-fade-in">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="book-card-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="book-card-image bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Sem imagem</span>
          </div>
        )}
        <CardContent className="flex flex-col p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium line-clamp-2">{book.title}</h3>
            <span className="font-bold text-sm text-primary whitespace-nowrap ml-2">
              {formatPrice(book.price)}
            </span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {book.categories.slice(0, 2).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
              {getConditionLabel(book.condition)}
            </Badge>
          </div>
          
          {showSellerInfo && (
            <div className="mt-2 text-sm text-muted-foreground">
              Vendedor: {book.sellerName}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
