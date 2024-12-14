import { FiYoutube } from "react-icons/fi";
import { HiMiniCheck, HiMiniClock, HiMiniHeart, HiMiniPlay } from "react-icons/hi2";
import {useState } from "react";
import { toast } from "react-toastify";
import tagIcon from "../../assets/icons/tag.svg";
import { useMovieContext } from "../../contexts/MovieContext";
import Rating from "./Rating";
import MovieTrailer from "./MovieTrailer";
import { useAuthContext } from "../../contexts/AuthContext";
import { addToFavorites, addToWatchlist, removeFromFavorites, removeFromWatchlist } from "../../api/movie";

export default function MovieCard({ movie }) {
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    const { authData } = useAuthContext();
    const { movieData, dispatch } = useMovieContext();

    const userId = authData?.user?.user_id;

    const favoriteMovie = movieData.favorites?.find((favMovie) => favMovie.movie_id === movie.movie_id);
    const isFavorite = !!favoriteMovie;

    const watchLaterMovie = movieData.watchlist?.find((wlMovie) => wlMovie.movie_id === movie.movie_id);
    const isWatchLater = !!watchLaterMovie;

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        console.log(movie.poster_url);
        if (isFavorite) {
            const response = await removeFromFavorites(userId, movie.movie_id);
            if (response?.success) {
                dispatch({ type: "REMOVE_FROM_FAVORITES", movie });
                toast.info(response.message);
            } else {
                toast.error("Failed to remove movie from favorites. Please try again.");
            }
        } else {
            const response = await addToFavorites(userId, movie.movie_id);
            if (response?.success) {
                dispatch({ type: "ADD_TO_FAVORITES", movie });
                toast.success(response.message);
            } else {
                toast.error("Failed to add movie to favorites. Please try again.");
            }
        }
    };

    const handleToggleWatchLater = async (e) => {
        e.stopPropagation();
        if (isWatchLater) {
            const response = await removeFromWatchlist(userId, movie.movie_id);
            if (response?.success) {
                dispatch({ type: "REMOVE_FROM_WATCHLIST", movie });
                toast.info(response.message);
            } else {
                toast.error("Failed to remove movie from Watch Later. Please try again.");
            }
        } else {
            const response = await addToWatchlist(userId, movie.movie_id);
            if (response?.success) {
                dispatch({ type: "ADD_TO_WATCHLIST", movie });
                toast.success(response.message);
            } else {
                toast.error("Failed to add movie to Watch Later. Please try again.");
            }
        }
    };


    return (
        <figure
            className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl cursor-pointer"
            onClick={() => {
                dispatch({
                    type: "OPEN_MOVIE_MODAL",
                    movie,
                });
            }}
        >
            
            <img 
                className="w-full object-cover" 
                // src={`/movie_posters/${movie.poster_url}`} 
                src={`http://localhost:3001${movie.poster_url}`} 
                alt="" />
            <figcaption className="pt-4">
                <h3 className="text-xl mb-1">{movie.title}</h3>
                <p className="text-[#575A6E] text-sm mb-2">{movie.genres}</p>
                <Rating value={movie.avg_rating} />
                {!movie.isUpcoming ? (
                    <div className="flex gap-4 items-center justify-center flex-wrap">
                        <button
                            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm flex-auto btn-hover"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTrailerModal(true);
                            }}

                        >
                            <img src={tagIcon} />
                            <span>View Movie Trailer</span>
                            <FiYoutube color="#171923" size="24" />

                        </button>
                        {/* 
                        <button
                            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm flex-auto btn-hover"
                            onClick={(e) => {
                                e.stopPropagation();

                                if (itemFoundInArray(movieData.cartItems, movie.id)) {
                                    toast.warning(`${movie.title} already exists in cart`);
                                } else {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        movie,
                                    });
                                    toast.success(`${movie.title} added to cart`);
                                }
                            }}
                        >
                            <img src={tagIcon} />
                            <span>
                                ${movie.price} | {itemFoundInArray(movieData.cartItems, movie.id) ? "Added" : "Add to Cart"}
                            </span>
                        </button>
                        */}
                        <div className="flex gap-4 items-center justify-center">
                            <button
                                className="py-2 px-3 border border-primary rounded-lg text-sm text-primary hover:bg-primary/[20%]"
                                onClick={(e) => {
                                    handleToggleWatchLater(e);
                                    // e.stopPropagation();
                                    // dispatch({ type: "TOGGLE_IS_WATCH_LATER", movie, });
                                    // toast.info(`${movie.title} ${!isWatchLater ? "added to" : "removed from"} watch later`);
                                }}
                            >
                                {isWatchLater ? <HiMiniCheck size={16} /> : <HiMiniClock size={16} />}
                            </button>
                            <button
                                className="py-2 px-3 border border-primary rounded-lg text-sm text-primary hover:bg-primary/[20%]"
                                onClick={(e) => {
                                    handleToggleFavorite(e);

                                    // e.stopPropagation();
                                    // dispatch({ type: "TOGGLE_IS_FAVORITE", movie });
                                    // toast.info(`${movie.title} ${!movie.isFavorite ? "added to" : "removed from"} favorite`);
                                }}
                            >
                                {isFavorite ? <HiMiniHeart size={16} color="red" /> : <HiMiniHeart size={16} />}
                            </button>
                            {/* Trailer Button */}
                            <button
                                className="py-2 px-3 border border-primary rounded-lg text-sm text-primary hover:bg-primary/[20%]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTrailerModal(true);
                                }}
                            >
                                <HiMiniPlay size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className="bg-gray-500 rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm w-full">
                        <HiMiniClock size={16} />
                        <span>Comming Soon</span>
                    </button>
                )}
            </figcaption>
            {/* MovieTrailer Modal */}
            {showTrailerModal && ( 
                <MovieTrailer 
                    movie={movie} 
                    onClose={() => setShowTrailerModal(false)}
                /> 
            )}
        </figure>
    );
}
