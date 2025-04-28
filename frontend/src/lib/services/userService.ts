
import { User } from '@/types';
import { CURRENT_USER_KEY, users } from '../mockData';

export const getCurrentUser = (): User => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    if (!userData) {
      console.warn('User not found in localStorage, returning default user');
      
      // Return a default user instead of throwing an error
      return {
        id: 'currentUser',
        name: 'Você',
        email: 'you@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
      };
    }
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting current user:', error);
    // Fallback to the third user in our mock data (index 2)
    return users[2];
  }
};
