import axios from 'axios';
import { store } from 'app/store';
import { updateToken } from "entities/auth/model/auth.slice";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});



apiService.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${store.getState().authSlice.accessToken}`;
  return config;
});

async function refreshToken() {
  try {
    const response = await axios.get(API_URL + '/refresh', {
      withCredentials: true,
    });
    const access_token = response.data.user.access_token;

    if (access_token) {
      store.dispatch(updateToken({ access_token }));
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

apiService.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const config = error.config;
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
       const response = await refreshToken();
       const access_token = await response.data.user.access_token;
        if (access_token) {
          config.headers['Authorization'] = `Bearer ${access_token}`;
          return apiService(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);
