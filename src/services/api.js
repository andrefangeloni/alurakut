import axios from 'axios';

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
