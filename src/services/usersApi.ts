import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface UsersApiService {
  getUsersAliases: () => Promise<ApiResponse<string[]>>;
}

export const usersApi: UsersApiService = {
  async getUsersAliases() {
    const result = await apiClient.get<string[]>(API_CONFIG.ENDPOINTS.USERS.ALIASES);
    return result;
  }
}; 