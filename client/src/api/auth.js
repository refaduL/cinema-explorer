import axios from "axios";

export const loginUser = async (credentials) => {
    const response = await axios.post("http://localhost:3001/api/auth/login", credentials, {
        withCredentials: true, // Ensures cookies are included
    });
    return response.data; // { user, token }
};

export const logoutUser = async () => {
    await axios.post("http://localhost:3001/api/auth/logout", {}, {
        withCredentials: true,
    });
};

export const fetchCurrentUser = async () => {
    const response = await axios.get("http://localhost:3001/api/auth/me", {
        withCredentials: true,
    });
    return response.data; // { user, token }
};
