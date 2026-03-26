import api from './api';
import Cookies from 'js-cookie';
import { getErrorMessage } from '../utils/errorHandler';
import { TokenResponse } from '../types';

export const authService = {
  login: async (username: string, password: string): Promise<void> => {
    try {
      const response = await api.post<TokenResponse>('/token/', { username, password });
      Cookies.set('access_token', response.data.access, { expires: 1 });
      Cookies.set('refresh_token', response.data.refresh, { expires: 7 });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  logout: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    window.location.href = '/login';
  }
};