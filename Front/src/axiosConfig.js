import axios from "axios";

const instance = axios.create({
  // baseURL: "https://ecommerce-api-8ga2.onrender.com/api",
  baseURL: "http://localhost:4000/api",
});

export default instance;

// For more Knowledge

// Other arguments to create
// withCredentials
// timeout
// interceptor
