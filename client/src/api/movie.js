import { toast } from "react-toastify";
import api from "./index";


// Movies
export const fetchMovies = async () => {
  try {
    return await api.get(`/api/movies`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};
// Add Movie
export const addMovie = async (movieInfo, posterFile) => {
  try {
    const formData = new FormData();
    formData.append("title", movieInfo.title);
    formData.append("description", movieInfo.description);
    formData.append("genres", movieInfo.genres);
    formData.append("actors", movieInfo.actors);
    formData.append("directors", movieInfo.directors);
    formData.append("release_date", movieInfo.release_date);
    formData.append("duration", movieInfo.duration);
    formData.append("trailer_url", movieInfo.trailer_url);
    formData.append("isUpcoming", movieInfo.isUpcoming);
    formData.append("isNewRelease", movieInfo.isNewRelease);
    formData.append("isTrending", movieInfo.isTrending);

    if (posterFile) {
      formData.append("poster", posterFile);
    }

    const response = await api.post("/api/movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This is necessary for file uploads
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
// Delete Movie
export const deleteMovie = async (movieId) => {
  try {
    const response = await api.delete(`/api/movies/${movieId}`);
    toast.success("Movie deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to delete the movie. Please try again."
    );
    throw error;
  }
};


export const addToFavorites = async (userId, movieId) => {
  try {
    const response = await api.post(`/api/movies/favorites/${movieId}`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    toast.error(error.response.data.message);
  }
};

export const removeFromFavorites = async (userId, movieId) => {
  try {
    const response = await api.delete(`/api/movies/favorites/${movieId}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

export const addToWatchlist = async (userId, movieId) => {
  try {
    const response = await api.post(`/api/movies/watchlist/${movieId}`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error.message);
  }
};

export const removeFromWatchlist = async (userId, movieId) => {
  try {
    const response = await api.delete(`/api/movies/watchlist/${movieId}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from watchlist:", error.message);
  }
};


export const fetchUsers = async () => {
  try {
    return await api.get(`/api/dashboard/manage-users`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};

// Actors
export const fetchActors = async () => {
  try {
    return await api.get(`/api/dashboard/manage-actors`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching actors: ", error);
  }
};
// Add Actor
export const addActor = async (actorInfo) => {
  try {
    const response = await api.post("/api/dashboard/manage-actors", actorInfo);
    toast.success("Actor added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error adding actor:", error);
    toast.error(error.response?.data?.message || "Failed to add actor.");
    console.log("reached here");
    throw error;
  }
};
// Update Actor
export const updateActor = async (actorId, actorInfo) => {
  try {
    const response = await api.put(
      `/api/dashboard/manage-actors/${actorId}`,
      actorInfo
    );
    toast.success("Actor updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating actor:", error);
    toast.error(error.response?.data?.message || "Failed to update actor.");
    throw error;
  }
};
// Delete Actor
export const deleteActor = async (actorId) => {
  try {
    const response = await api.delete(
      `/api/dashboard/manage-actors/${actorId}`
    );
    toast.success("Actor deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting actor:", error);
    toast.error(error.response?.data?.message || "Failed to delete actor.");
    throw error;
  }
};


// Directors
export const fetchDirectors = async () => {
  try {
    return await api.get(`/api/dashboard/manage-directors`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching directors: ", error);
  }
};
// Add Director
export const addDirector = async (directorInfo) => {
  try {
    const response = await api.post(
      "/api/dashboard/manage-directors",
      directorInfo
    );
    toast.success("Director added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error adding director:", error);
    toast.error(error.response?.data?.message || "Failed to add director.");
    throw error;
  }
};
// Update Director
export const updateDirector = async (directorId, directorInfo) => {
  try {
    const response = await api.put(
      `/api/dashboard/manage-directors/${directorId}`,
      directorInfo
    );
    toast.success("Director updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating director:", error);
    toast.error(error.response?.data?.message || "Failed to update director.");
    throw error;
  }
};
// Delete Director
export const deleteDirector = async (directorId) => {
  try {
    const response = await api.delete(
      `/api/dashboard/manage-directors/${directorId}`
    );
    toast.success("Director deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting director:", error);
    toast.error(error.response?.data?.message || "Failed to delete director.");
    throw error;
  }
};
