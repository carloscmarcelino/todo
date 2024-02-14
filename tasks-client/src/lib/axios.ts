import axios from 'axios';

export const axiosObject = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosObject;
