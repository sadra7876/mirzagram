import axios from "axios";
import { toast } from "react-toastify";

// interface ErrorResponse {
//   statusCode: number;
//   isSuccess: boolean;
//   result: any;
//   messages: string[];
// }

// Define the interface for the success response
interface SuccessResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  result: T;
  messages?: string[];
}

// Define the interface for the error response
interface ErrorResponse {
  statusCode: number;
  isSuccess: boolean;
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
    const data = response.data as SuccessResponse<any>; // Type the response data as SuccessResponse
    if (data.isSuccess) {
      toast.success(data.messages?.join(", "));
      if (data.result) {
        return data.result; // Return the result if the response is successful
      } else {
        return true;
      }
    } else {
      // Handle unexpected success response structure
      toast.error("Unexpected response structure.");
      return Promise.reject(new Error("Unexpected response structure."));
    }
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as ErrorResponse;
      if (status === 401) {
        // Handle unauthorized errors, e.g., redirect to login
        window.location.href = "/login";
      } else if (
        (status === 400 || status === 404) &&
        errorData.messages &&
        errorData.messages.length > 0
      ) {
        toast.error(errorData.messages.join(", "));
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      toast.error("Network error.");
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
