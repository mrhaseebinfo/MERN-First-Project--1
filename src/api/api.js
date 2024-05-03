import axios from "axios"; // Importing Axios for making HTTP requests
import { logout } from "../shared/utils"; // Importing logout utility function

// Creating an Axios instance with baseURL and timeout configuration
const apiClient = axios.create({
  baseURL: "http://localhost:5002/api", // Base URL for API requests
  timeout: 1000, // Request timeout in milliseconds
});

// Axios request interceptor to add Authorization header before sending requests
apiClient.interceptors.request.use(
  (config) => {
    // Retrieving user details from localStorage
    const userDetails = localStorage.getItem("user");

    // If user details exist, add Authorization header with token
    if (userDetails) {
      const token = JSON.parse(userDetails).token; // Extracting token from user details
      config.headers.Authorization = `Bearer ${token}`; // Adding Authorization header
    }

    return config; // Returning updated request config
  },
  (err) => {
    return Promise.reject(err); // Returning a rejected promise for errors
  }
);

// Function to handle user login
export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data); // Making a POST request to login endpoint
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to handle user registration
export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data); // Making a POST request to register endpoint
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to get channel settings
export const getChannelSettings = async () => {
  try {
    return await apiClient.get("/settings/channel"); // Making a GET request to get channel settings
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to update channel settings
export const updateChannelSettings = async (data) => {
  try {
    return await apiClient.put("/settings/channel", data); // Making a PUT request to update channel settings
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to change user password
export const changePassword = async (data) => {
  try {
    return await apiClient.patch("/settings/password", data); // Making a PATCH request to change password
  } catch (exception) {
    return {
      error: true,
      exception: exception,
    };
  }
};

// Function to get followed channels
export const getFollowedChannels = async () => {
  try {
    return await apiClient.get("/channels/followed"); // Making a GET request to get followed channels
  } catch (exception) {
    checkResponseStatus(exception); // Checking response status for unauthorized or forbidden errors
    return {
      error: true,
      exception: exception,
    };
  }
};

// Function to get all channels
export const getChannels = async () => {
  try {
    return await apiClient.get("/channels"); // Making a GET request to get all channels
  } catch (exception) {
    return {
      error: true,
      exception: exception,
    };
  }
};

// Function to get details of a specific channel
export const getChannelDetails = async (channelId) => {
  try {
    return await apiClient.get(`/channels/${channelId}`); // Making a GET request to get channel details
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to follow a channel
export const followChannel = async (channelId) => {
  try {
    return await apiClient.post("/channels/follow", {
      channelId,
    }); // Making a POST request to follow a channel
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// Function to check response status and logout if unauthorized or forbidden
const checkResponseStatus = (exception) => {
  const responseStatus = exception?.response?.status; // Getting response status from exception

  // Logging out user if response status is 401 (Unauthorized) or 403 (Forbidden)
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};
