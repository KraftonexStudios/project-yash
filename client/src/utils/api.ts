import axios from "axios";
import { getToken } from "../hooks/auth"; // Import function to get stored token

// Create an Axios instance
const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api", // Backend URL with /api prefix
=======
  baseURL: "http://localhost:8000/api", // Backend URL
>>>>>>> 47375d7515f9f5fb5b9bf50f845854b811b063b1
});

// Attach token dynamically to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
