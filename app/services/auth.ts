import axiosInstance from './axiosInstance';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
  companyId?: number;
  isOwner?: boolean;
}) => {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data);

  // Salvar token no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', res.data.accessToken); // supondo que seu login retorna { accessToken: '...' }
  }

  return res.data;
};

export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};