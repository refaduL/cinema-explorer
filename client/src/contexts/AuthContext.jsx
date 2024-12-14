import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducers } from "../reducers/authReducers";
import { toast } from "react-toastify";
import { fetchCurrentUser, signInUser, signOutUser } from "../api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext);
}

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

export default function AuthProvider({ children }) {
    const [authData, dispatch] = useReducer(authReducers, initialState);

    // Restore session on app load
    useEffect(() => {
        const restoreSession = async () => {
            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const response = await fetchCurrentUser();
                const { user, token } = response.payload;
                if (user && token) {
                    dispatch({ type: "RESTORE_SESSION", payload: { user, token } });
                }
            } catch (error) {
                console.error("Failed to restore session:", error.message);
                dispatch({ type: "SET_ERROR", payload: "Failed to restore session" });
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };

        restoreSession();
    }, []);

    // Login function
    const login = async (credentials) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await signInUser(credentials);
            const { user, token } = response.payload;
            dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login failed:", error.message);
            dispatch({ type: "SET_ERROR", payload: error.response?.data?.message || "Login failed" });
            toast.error("Login failed. Please try again.");
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOutUser(); // Ensure token is cleared server-side
            dispatch({ type: "LOGOUT_SUCCESS" });
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout failed:", error.message);
            dispatch({ type: "SET_ERROR", payload: error.response?.data?.message || "Logout failed" });
            toast.error("Logout failed. Please try again.");
        }
    };

    // Update user info (e.g., profile updates)
    const updateUserInfo = (updatedInfo) => {
        dispatch({ type: "UPDATE_USER_INFO", payload: updatedInfo });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout, updateUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
}



