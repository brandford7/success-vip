import axios from "axios";

const BASE_URL = process.env.NEXT_API_URL;

// Create an Axios instance with the base URL
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


