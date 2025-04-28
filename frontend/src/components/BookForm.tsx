
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book } from '@/types';
import { getCurrentUser, addBook, updateBook, bookConditions } from '@/lib/dataService';

interface BookFormProps {
  book?: Book;
  isEditing?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, isEditing = false }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [imagePreview, setImagePreview] = useState<string>(book?.coverImage || '');
  const [title, setTitle] = useState<string>(book?.title || '');
  const [description, setDescription] = useState<string>(book?.description || '');
  const [price, setPrice] = useState<string>(book?.price ? book.price.toString() : '');
  const [condition, setCondition] = useState<string>(book?.condition || 'good');
  const [categories, setCategories] = useState<string>(book?.categories?.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookData = {
        title,
        description,
        price: parseFloat(price),
        coverImage: imagePreview || '/placeholder.svg',
        categories: categories.split(',').map(cat => cat.trim()).filter(Boolean),
        condition: condition as 'new' | 'like-new' | 'good' | 'fair' | 'poor',
        sellerId: currentUser.id,
        sellerName: currentUser.name,
      };

      if (isEditing && book) {
        updateBook(book.id, bookData);
      } else {
        addBook(bookData);
      }

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="form-control">
        <Label className="form-label">Imagem de Capa</Label>
        <div className="flex flex-col items-center">
          <div className="mb-4 w-full max-w-[200px] aspect-[2/3] overflow-hidden rounded-md border bg-muted">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Pré-visualização da capa" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Sem imagem
              </div>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Carregue uma imagem de capa para o livro (recomendado: formato 2:3)
          </p>
        </div>
      </div>

      <div className="form-control">
        <Label htmlFor="title" className="form-label">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Título do livro"
        />
      </div>

      <div className="form-control">
        <Label htmlFor="description" className="form-label">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Descreva o estado e detalhes do livro"
          rows={4}
        />
      </div>

      <div className="form-control">
        <Label htmlFor="price" className="form-label">Preço (R$)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="99.90"
        />
      </div>

      <div className="form-control">
        <Label htmlFor="categories" className="form-label">Categorias</Label>
        <Input
          id="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          required
          placeholder="Ficção, Aventura, Romance (separadas por vírgula)"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Separe as categorias por vírgulas
        </p>
      </div>

      <div className="form-control">
        <Label htmlFor="condition" className="form-label">Estado do Livro</Label>
        <Select 
          value={condition} 
          onValueChange={setCondition}
        >
          <SelectTrigger id="condition">
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {bookConditions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Publicar Livro'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
