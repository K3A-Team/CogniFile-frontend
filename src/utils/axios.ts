import axios, { AxiosInstance } from 'axios';

const customAxios = async (): Promise<AxiosInstance> => {
  const api = axios.create({
    baseURL: 'https://api.cognifile.org/',
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return api;
};

export default customAxios;
