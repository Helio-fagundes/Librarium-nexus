
import { Message, Conversation } from '@/types';
import { MESSAGES_KEY, CONVERSATIONS_KEY } from '../mockData';

export const getAllMessages = (): Message[] => {
  const messagesData = localStorage.getItem(MESSAGES_KEY);
  if (!messagesData) return [];
  return JSON.parse(messagesData);
};

export const getConversations = (userId: string): Conversation[] => {
  const conversationsData = localStorage.getItem(CONVERSATIONS_KEY);
  if (!conversationsData) return [];
  const conversations: Conversation[] = JSON.parse(conversationsData);
  return conversations.filter(conv => conv.participants.includes(userId));
};

export const getConversation = (id: string): Conversation | undefined => {
  const conversationsData = localStorage.getItem(CONVERSATIONS_KEY);
  if (!conversationsData) return undefined;
  const conversations: Conversation[] = JSON.parse(conversationsData);
  return conversations.find(conv => conv.id === id);
};

export const getMessagesByConversation = (conversationId: string): Message[] => {
  const conversation = getConversation(conversationId);
  if (!conversation) return [];
  
  const allMessages = getAllMessages();
  return allMessages.filter(msg => 
    conversation.participants.includes(msg.senderId) && 
    conversation.participants.includes(msg.receiverId)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const sendMessage = (
  senderId: string, 
  receiverId: string, 
  content: string, 
  bookId?: string
): Message => {
  const messages = getAllMessages();
  const conversations = localStorage.getItem(CONVERSATIONS_KEY) 
    ? JSON.parse(localStorage.getItem(CONVERSATIONS_KEY)!) as Conversation[]
    : [];
  
  // Create new message
  const newMessage: Message = {
    id: `msg${Date.now()}`,
    senderId,
    receiverId,
    bookId,
    content,
    createdAt: new Date().toISOString(),
    read: false
  };
  
  // Add message to messages array
  localStorage.setItem(MESSAGES_KEY, JSON.stringify([...messages, newMessage]));
  
  // Check if a conversation already exists
  const participantsCheck = [senderId, receiverId].sort();
  let conversation = conversations.find(c => 
    c.participants.length === 2 && 
    c.participants.includes(participantsCheck[0]) && 
    c.participants.includes(participantsCheck[1])
  );
  
  if (conversation) {
    // Update existing conversation
    conversation = {
      ...conversation,
      lastMessage: newMessage,
      updatedAt: newMessage.createdAt,
      bookId: bookId || conversation.bookId
    };
    
    const conversationIndex = conversations.findIndex(c => c.id === conversation!.id);
    conversations[conversationIndex] = conversation;
  } else {
    // Create new conversation
    conversation = {
      id: `conv${Date.now()}`,
      participants: participantsCheck,
      bookId,
      lastMessage: newMessage,
      updatedAt: newMessage.createdAt
    };
    
    conversations.push(conversation);
  }
  
  // Update conversations in local storage
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  
  return newMessage;
};

export const markMessagesAsRead = (conversationId: string, userId: string): void => {
  const messages = getAllMessages();
  const conversation = getConversation(conversationId);
  
  if (!conversation) return;
  
  const updatedMessages = messages.map(msg => {
    if (conversation.participants.includes(msg.senderId) && 
        conversation.participants.includes(msg.receiverId) &&
        msg.receiverId === userId && 
        !msg.read) {
      return { ...msg, read: true };
    }
    return msg;
  });
  
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));
};
