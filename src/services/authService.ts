import { LoginRequest } from '../types/formTypes';

// Mock service to simulate login API call
export const loginService = async (data: LoginRequest): Promise<{ token: string; userName: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.userName === 'kareem@aldeek.com' && data.password === 'password123') {
        return true
      } else {
        return false
      }
    }, 1000); // Simulate network delay
  });
};