import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://mv-water-level-controller.onrender.com"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export default api;
