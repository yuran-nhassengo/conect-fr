import axios from 'axios';

const API_URL = 'http://localhost:3001'; // URL do backend NestJS

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token a cada requisição
axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    console.log('[Axios] Token sendo enviado:', token);

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para log de resposta (útil para debug de 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios] Erro na requisição:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
