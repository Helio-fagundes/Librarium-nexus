
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  categories: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  sellerId: string;
  sellerName: string;
  createdAt: string;
  views: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  bookId?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  bookId?: string;
  lastMessage?: Message;
  updatedAt: string;
}
