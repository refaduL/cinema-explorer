import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// API calls

export const registerUser = async (userData) => {
  return await api.post("/api/users/signup", userData);
};

export const signInUser = async (credentials) => {
  const response = await api.post(`/api/auth/signin`, credentials, { withCredentials: true });
  return response.data;
};

export const signOutUser = async () => {
  const response = await api.post("/api/auth/signout", {}, { withCredentials: true });
  return response.data;
};

export const fetchAuthenticatedUser = async () => {
  const response = await api.get("/api/auth/user", { withCredentials: true });
  console.log(response.data);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/api/auth/me", { withCredentials: true });
  return response.data; // { user, token }
};

export const getAllUsers = async () => {
  const response = await api.get(`/api/users`, { withCredentials: true });
  return response.data; // { reviews }
};

export const fetchReviewsByMovieId = async (movieId) => {
  const response = await api.get(`/api/movies/reviews/${movieId}`, { withCredentials: true });
  return response.data; // { reviews }
};



export default api;

// export const getAllUsers = async () => {
//   return api.get("/users");
// };

// export const deleteUser = async (userId) => {
//   return api.delete(`/users/${userId}`);
// };

// export const getUserById = async (userId) => {
//   return api.get(`/users/${userId}`);
// };

// export const updateUser = async (userId, updatedData) => {
//   return api.put(`/users/${userId}`, updatedData);
// };


