// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Adjust if your backend is on a different port
});

// We'll set the token in AuthContext
export default api;