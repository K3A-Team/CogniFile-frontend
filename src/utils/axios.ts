import axios from 'axios';

const baseURL = process.env.API_URL;

export default axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
