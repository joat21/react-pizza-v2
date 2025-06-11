import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { API_URL } from 'config';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const queryClient = new QueryClient();
