import axios from 'axios';
import Cookies from 'js-cookie';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Axios instance
const api = axios.create({
  baseURL: 'https://techtest.youapp.ai/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to the request headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('TokenX');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API hooks

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, username }) => {
      const response = await api.post('/login', { email, password, username });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/register', userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/getProfile');
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, 
    onError: (error) => {
      console.error('Fetching profile failed:', error);
    },
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const response = await api.post('/createProfile', profileData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Profile creation failed:', error);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const response = await api.put('/updateProfile', profileData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
};
