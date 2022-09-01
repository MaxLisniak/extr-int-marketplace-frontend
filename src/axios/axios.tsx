import axios from 'axios';

const BASE_URL = 'http://localhost:3000/'

export const configuredAxios = axios.create({
  baseURL: BASE_URL,
});

// axios object for sending requests with cookies
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

