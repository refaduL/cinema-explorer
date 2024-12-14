import { createContext, useContext, useReducer, useState, useEffect } from "react";
// import { getDefaultMovies } from "../data/movies";
import movieReducers from "../reducers/movieReducers";
import api from "../api";
import { useAuthContext } from "./AuthContext";

const MovieContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useMovieContext() {
    return useContext(MovieContext);
}

export default function MovieProvider({ children }) {
    const { authData } = useAuthContext();
    const userId = authData?.user?.user_id;

    const [movieData, dispatch] = useReducer(movieReducers, {
        // movies: getDefaultMovies(),
        movies: [],
        favorites: [],
        watchlist: [],
        showMovieModal: false,
        modalMovieInfo: null,
        cartItems: [],
    });
    const [seachKeyword, setSeachKeyword] = useState("");
    const [movieFilter, setMovieFilter] = useState("allMovies");
    const [showCartModal, setShowCartModal] = useState(false);

    // Fetch movies, favorites, and watchlist on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch movies for all users
                const moviesRes = await api.get("/api/movies");
                dispatch({ type: "SET_MOVIES", movies: moviesRes.data.payload });

                // Fetch user-specific data (favorites, watchlist) only if authenticated
                if (userId) {
                    const [favoritesRes, watchlistRes] = await Promise.all([
                        api.get("/api/movies/favorites/all", { params: { user_id: userId } }),
                        api.get("/api/movies/watchlist/all", { params: { user_id: userId } }),
                    ]);

                    dispatch({ type: "SET_FAVORITES", favorites: favoritesRes.data.payload });
                    dispatch({ type: "SET_WATCHLIST", watchlist: watchlistRes.data.payload });
                } else {
                    dispatch({ type: "SET_FAVORITES", favorites: [] });
                    dispatch({ type: "SET_WATCHLIST", watchlist: [] });
                }
            } catch (error) {
                console.error("Error fetching data on load:", error.message);
            }
        };

        fetchData();
    }, [userId]);

    const providerData = {
        movieData,
        dispatch,
        seachKeyword,
        setSeachKeyword,
        movieFilter,
        setMovieFilter,
        showCartModal,
        setShowCartModal,

    };

    return <MovieContext.Provider value={providerData}>{children}</MovieContext.Provider>;
}
