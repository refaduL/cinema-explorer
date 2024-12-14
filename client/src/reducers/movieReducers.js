export default function movieReducers(movieData, action) {
    switch (action.type) {
        case "SET_MOVIES":
            return { ...movieData, movies: action.movies };

        case "SET_FAVORITES":
            return { ...movieData, favorites: action.favorites };

        case "SET_WATCHLIST":
            return { ...movieData, watchlist: action.watchlist };

        case "ADD_TO_FAVORITES":
            return {
                ...movieData,
                favorites: [...movieData.favorites, action.movie], // Optimistic update
            };

        case "REMOVE_FROM_FAVORITES":
            return {
                ...movieData,
                favorites: movieData.favorites.filter((favMovie) => favMovie.movie_id !== action.movie.movie_id), // Optimistic update
            };

        case "ADD_TO_WATCHLIST":
            return {
                ...movieData,
                watchlist: [...movieData.watchlist, action.movie], // Optimistic update
            };

        case "REMOVE_FROM_WATCHLIST":
            return {
                ...movieData,
                watchlist: movieData.watchlist.filter((wlMovie) => wlMovie.movie_id !== action.movie.movie_id), // Optimistic update
            };
            
        case "OPEN_MOVIE_MODAL":
            return {
                ...movieData,
                showMovieModal: true,
                modalMovieInfo: action.movie,
            };
        case "CLOSE_MOVIE_MODAL":
            return {
                ...movieData,
                showMovieModal: false,
                modalMovieInfo: null,
            };
        // case "ADD_TO_CART":
        //     return {
        //         ...movieData,
        //         cartItems: [...movieData.cartItems, action.movie],
        //     };
        // case "REMOVE_FROM_CART":
        //     return {
        //         ...movieData,
        //         cartItems: movieData.cartItems.filter((movie) => movie.id != action.movie.id),
        //     };
        // case "TOGGLE_IS_FAVORITE":
        //     return {
        //         ...movieData,
        //         movies: movieData.movies.map((movie) => {
        //             if (movie.id === action.movie.id) {
        //                 return {
        //                     ...movie,
        //                     isFavorite: !movie.isFavorite,
        //                 };
        //             } else {
        //                 return movie;
        //             }
        //         }),
        //     };
        // case "TOGGLE_IS_WATCH_LATER":
        //     return {
        //         ...movieData,
        //         movies: movieData.movies.map((movie) => {
        //             if (movie.id === action.movie.id) {
        //                 return {
        //                     ...movie,
        //                     isWatchLater: !movie.isWatchLater,
        //                 };
        //             } else {
        //                 return movie;
        //             }
        //         }),
        //     };
        default: {
            throw Error(`No action matched with ${action.type}`);
        }
    }
}
