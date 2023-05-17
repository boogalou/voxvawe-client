import axios from 'axios';
import { store } from 'app/store';
import { authService } from 'entities/auth/api';

const API_URL = 'http://localhost:3000/api';

export const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiService.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${store.getState().authSlice.accessToken}`;
  console.log('intercept request: ', config.headers.Authorization);
  return config;
});

apiService.interceptors.response.use(
  async (response) => {
    console.log('intercept response: ', response);
    return response;
  },
  async (error) => {
    console.log('intercept error: ', error);
    if (error.response.status === 401) {
      await authService.checkAuth();
    }
    return Promise.reject(error);
  }
);
//Todo "допилить"