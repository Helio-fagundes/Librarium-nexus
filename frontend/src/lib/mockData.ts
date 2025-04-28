
import { Book, User, Message, Conversation } from '@/types';

// Mock users
export const users: User[] = [
  {
    id: 'user1',
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'user2',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'currentUser',
    name: 'Você',
    email: 'you@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

// Mock books
export const books: Book[] = [
  {
    id: 'book1',
    title: 'O Senhor dos Anéis',
    description: 'Trilogia clássica de J.R.R. Tolkien. Livro em excelente estado, edição especial com mapas e ilustrações.',
    price: 89.90,
    coverImage: '/book-cover-1.jpg',
    categories: ['Fantasia', 'Aventura'],
    condition: 'like-new',
    sellerId: 'user1',
    sellerName: 'João Silva',
    createdAt: '2023-05-15T10:30:00Z',
    views: 45,
  },
  {
    id: 'book2',
    title: 'Harry Potter e a Pedra Filosofal',
    description: 'Primeiro livro da série Harry Potter. Capa dura, primeira edição brasileira.',
    price: 59.90,
    coverImage: '/book-cover-2.jpg',
    categories: ['Fantasia', 'Juvenil'],
    condition: 'good',
    sellerId: 'user1',
    sellerName: 'João Silva',
    createdAt: '2023-06-20T14:15:00Z',
    views: 32,
  },
  {
    id: 'book3',
    title: 'Duna',
    description: 'Obra-prima de ficção científica de Frank Herbert. Livro com anotações a lápis nas margens.',
    price: 45.50,
    coverImage: '/book-cover-3.jpg',
    categories: ['Ficção Científica', 'Clássico'],
    condition: 'good',
    sellerId: 'user2',
    sellerName: 'Maria Oliveira',
    createdAt: '2023-04-10T09:45:00Z',
    views: 38,
  },
  {
    id: 'book4',
    title: 'Cosmos',
    description: 'Livro de divulgação científica de Carl Sagan. Inclui DVDs do documentário.',
    price: 65.00,
    coverImage: '/book-cover-4.jpg',
    categories: ['Ciência', 'Astronomia'],
    condition: 'fair',
    sellerId: 'user2',
    sellerName: 'Maria Oliveira',
    createdAt: '2023-07-05T16:20:00Z',
    views: 27,
  },
  {
    id: 'book5',
    title: 'A Revolução dos Bichos',
    description: 'Fábula política de George Orwell. Livro novo, ainda na embalagem original.',
    price: 29.90,
    coverImage: '/book-cover-5.jpg',
    categories: ['Ficção', 'Política'],
    condition: 'new',
    sellerId: 'currentUser',
    sellerName: 'Você',
    createdAt: '2023-07-15T11:10:00Z',
    views: 19,
  },
  {
    id: 'book6',
    title: '1984',
    description: 'Clássico distópico de George Orwell. Edição com prefácio de especialista.',
    price: 34.50,
    coverImage: '/book-cover-6.jpg',
    categories: ['Ficção', 'Distopia'],
    condition: 'good',
    sellerId: 'currentUser',
    sellerName: 'Você',
    createdAt: '2023-08-01T08:30:00Z',
    views: 23,
  },
];

// Mock messages
export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    receiverId: 'currentUser',
    bookId: 'book1',
    content: 'Olá! Este livro ainda está disponível?',
    createdAt: '2023-08-20T14:25:00Z',
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'currentUser',
    receiverId: 'user1',
    bookId: 'book1',
    content: 'Sim, está disponível! Tem interesse?',
    createdAt: '2023-08-20T14:30:00Z',
    read: true,
  },
  {
    id: 'msg3',
    senderId: 'user2',
    receiverId: 'currentUser',
    bookId: 'book5',
    content: 'Oi! Você faz entrega ou preciso buscar?',
    createdAt: '2023-08-22T10:15:00Z',
    read: false,
  },
];

// Mock conversations
export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['currentUser', 'user1'],
    bookId: 'book1',
    lastMessage: messages[1],
    updatedAt: '2023-08-20T14:30:00Z',
  },
  {
    id: 'conv2',
    participants: ['currentUser', 'user2'],
    bookId: 'book5',
    lastMessage: messages[2],
    updatedAt: '2023-08-22T10:15:00Z',
  },
];

// Local storage keys
export const CURRENT_USER_KEY = 'bookbazaar-current-user';
export const BOOKS_KEY = 'bookbazaar-books';
export const MESSAGES_KEY = 'bookbazaar-messages';
export const CONVERSATIONS_KEY = 'bookbazaar-conversations';

// Initialize local storage with mock data
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(CURRENT_USER_KEY)) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[2]));
  }
  
  if (!localStorage.getItem(BOOKS_KEY)) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }
  
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
  
  if (!localStorage.getItem(CONVERSATIONS_KEY)) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  }
};
