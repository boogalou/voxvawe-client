import axios from 'axios';
import { store } from 'app/store';
import { checkAuthRequestAsync } from 'entities/auth';

const API_URL = 'http://localhost:3000/api';

export const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiService.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${ store.getState().authSlice.accessToken }`;
  return config;
});

apiService.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      store.dispatch(checkAuthRequestAsync());
    }
    return Promise.reject(error);
  }
);
//Todo "допилить"