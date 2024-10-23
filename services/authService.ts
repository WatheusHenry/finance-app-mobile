import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000'; // Substitua pela URL da sua API

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  access_token: string;
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}

const AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao registrar. Verifique os dados inseridos.');
    }
  },
};

export default AuthService;
