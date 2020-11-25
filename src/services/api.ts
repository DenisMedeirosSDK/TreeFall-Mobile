import axios from 'axios';
const api = axios.create({
  baseURL: 'https://tree-fall-be.herokuapp.com',
});

export default api;
