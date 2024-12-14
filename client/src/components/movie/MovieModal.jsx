import { HiStar } from "react-icons/hi2";
import { FaYoutube } from "react-icons/fa";
import {useState } from "react";
import tagIcon from "../../assets/icons/tag.svg";
import { useMovieContext } from "../../contexts/MovieContext";
import { itemFoundInArray } from "../../utils/common";
import UpdateReview from "./Reviews";
import MovieTrailer from "./MovieTrailer";
import { fetchReviewsByMovieId } from "../../api";

export default function MovieModal() {
    const { movieData, dispatch } = useMovieContext();
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    const [reviews, setReviews] = useState([]);

    const movie = movieData.modalMovieInfo; 

    const release_date = new Date(movie.release_date);
    const formatted_releaseDate = release_date.toLocaleDateString('en-GB').split('T')[0];

    const handleShowReviews = async () => {
        setShowReviews(!showReviews);
        const response = await fetchReviewsByMovieId(movie.movie_id);
        const reviews = response.payload;
        setReviews(reviews);
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
            <div
                className="absolute z-10 inset-0 cursor-pointer"
                onClick={() => {
                    dispatch({
                        type: "CLOSE_MOVIE_MODAL",
                    });
                }}
            ></div>
            <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4 max-h-[90vh] overflow-auto">
                <div className="bg-white shadow-md dark:bg-[#12141D] rounded-2xl sm:grid sm:grid-cols-[2fr_1fr] overflow-hidden items-center">
                    <img 
                        className="sm:order-2 w-full object-cover h-full max-sm:max-h-[300px]" 
                        src={`http://localhost:3001${movie.poster_url}`}
                        alt="Poster" />
                    <div className="p-5 lg:p-11">
                        <div className="">
                            <h2 className="text-2xl lg:text-[38px] lg:leading-[1.1] mb-3 font-bold">{movie.title}</h2>
                            <span className="flex items-center text-base text-[#9fa0a4] dark:text-[#575A6E] mb-2">
                                {formatted_releaseDate}
                                <span className="w-[5px] h-[5px] bg-[#9fa0a4] dark:bg-[#575A6E] mx-3 rounded"></span>
                                {movie.duration} Minutes
                            </span>
                            <span className="block text-base text-[#9fa0a4] dark:text-[#575A6E] mb-2">{movie.genres}</span>
                            <span className="text-primary mb-5 flex items-center">
                                <HiStar size={18} className="relative top-[-1px] mr-1" />
                                {Math.floor(movie.avg_rating * 10) / 10}/5
                            </span>
                        </div>

                        <div className="mb-8">
                            <p className="text-sm lg:text-base text-gray-800 dark:text-gray-300 mb-1">
                                <span className="font-semibold">Director:</span> {movie.directors}
                            </p>
                            <p className="text-sm lg:text-base text-gray-800 dark:text-gray-300">
                                <span className="font-semibold">Actors:</span> {movie.actors}
                            </p>
                        </div>
                        <p className="text-sm lg:text-base mb-8 lg:mb-16">{movie.description}</p>
                        {/* 3 buttons starts */}
                        <div className="grid lg:grid-cols-3 gap-2">
                            <button
                                className={`rounded-lg py-2 px-5 flex items-center justify-center gap-3 font-semibold text-sm 
                                    ${showReviews 
                                        ? "bg-primary text-gray-900 border-none btn-hover"
                                        : "border border-[#74766F] text-[#6F6F6F] dark:text-gray-200 btn-hover-transparent"}`}
                                onClick={() => {
                                    handleShowReviews();
                                }}
                            >
                                {showReviews ? "Hide Reviews" : "Show Reviews"}
                            </button>


                            <button
                                className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-3 text-[#171923] font-semibold text-sm btn-hover"
                                onClick={ (e) => {
                                    e.stopPropagation();
                                    setShowTrailerModal(true);
                                }}                                                             
                            >                                
                                <span>View Trailer</span>
                                <FaYoutube color="#DC143C" size="24" />
                            </button>
                            {
                                false && 
                                <button
                                    className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-3 text-[#171923] font-semibold text-sm btn-hover"
                                    onClick={() => {
                                        if (itemFoundInArray(movieData.cartItems, movie.id)) {
                                            console.log("Item Already in cart");
                                        } else {
                                            dispatch({
                                                type: "ADD_TO_CART",
                                                movie,
                                            });
                                        }
                                    }}
                                >
                                    <img src={tagIcon} />
                                    <span>
                                        ${movie.price} | {itemFoundInArray(movieData.cartItems, movie.id) ? "Added" : "Add to Cart"}
                                    </span>
                                </button> 
                            }
                            
                            <button
                                className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm btn-hover-transparent"
                                onClick={() => {
                                    dispatch({
                                        type: "CLOSE_MOVIE_MODAL",
                                    });
                                }}
                            >
                                Cancel
                            </button>                                                  
                        </div>
                        {/* 3 buttons ends */}
                    </div>
                </div>
                {showReviews && (
                    <div className="mt-4 bg-white shadow-md dark:bg-[#12141D] rounded-2xl p-5 lg:p-8">
                        <UpdateReview allreview={reviews} />
                    </div>
                )}

            </div>
            {/* MovieTrailer Modal */}
            { showTrailerModal && ( 
                <MovieTrailer 
                    movie={movie} 
                    onClose={() => setShowTrailerModal(false)}
                /> 
            )}
        </div>
    );
}
