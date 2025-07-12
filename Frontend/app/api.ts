import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // 🔁 Make sure this matches your FastAPI backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Enables cookie/session support if needed
});

export default api;
