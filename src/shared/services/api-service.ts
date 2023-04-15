import axios from "axios";


const API_URL = 'http://localhost:3000/api';

export const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

apiService.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

