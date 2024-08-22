import axios from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  statusCode: number;
  isSuccess: boolean;
  result: any;
  messages: string[];
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL, // Set your base URL here
  timeout: 10000, // Set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any request headers here, e.g., authorization token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as ErrorResponse;
      if (status === 401) {
        // Handle unauthorized errors, e.g., redirect to login
        window.location.href = "/login";
      } else if (
        status === 400 &&
        errorData.messages &&
        errorData.messages.length > 0
      ) {
        // Show the first error message from the messages array
        errorData.messages.forEach((item) => toast.error(item));
      } else {
        // Handle other errors
        toast.error("An error occurred. Please try again.");
      }
    } else {
      // Handle network or other errors
      toast.error("An error occurred. Please check your network connection.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
