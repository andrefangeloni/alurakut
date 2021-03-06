import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const loginAPI = axios.create({
  baseURL: 'https://alurakut.vercel.app/api',
});

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
});

export const datoAPI = axios.create({
  baseURL: 'https://graphql.datocms.com',
  headers: {
    Authorization: process.env.NEXT_PUBLIC_DATO_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
