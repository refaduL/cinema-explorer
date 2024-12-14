const express = require("express");
const movieRouter = express.Router();

const { getAllMovies, getMovieById, addNewMovie, updateMovieById, deleteMovieById, getAllFavoriteMovies, addToFavorites, removeFromFavorites, getAllWatchlistedMovies, addToWatchlist, removeFromWatchlist } = require("../controllers/movieController");
const { getReviewsByMovieId, addReviewToMovie, deleteReviewById, updateReviewById } = require("../controllers/reviewController");
const { isLoggedIn } = require("../middlewares/auth");
const uploadMoviePoster = require("../middlewares/uploadFile");

// movies
movieRouter.get("/", getAllMovies);

movieRouter.post("/", uploadMoviePoster.single("poster"), addNewMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", updateMovieById);
movieRouter.delete("/:id", deleteMovieById);


// user preferences
movieRouter.get("/favorites/all", getAllFavoriteMovies);
movieRouter.post("/favorites/:movie_id", isLoggedIn, addToFavorites);
movieRouter.delete("/favorites/:movie_id", removeFromFavorites);

movieRouter.get("/watchlist/all", getAllWatchlistedMovies);
movieRouter.post("/watchlist/:movie_id", addToWatchlist);
movieRouter.delete("/watchlist/:movie_id", removeFromWatchlist);


// review route for a movie
movieRouter.get("/reviews/:movie_id", getReviewsByMovieId);
movieRouter.post("/reviews/:movie_id", isLoggedIn, addReviewToMovie);
movieRouter.put("/reviews/:movie_id/:review_id", isLoggedIn, updateReviewById);
movieRouter.delete("/reviews/:movie_id/:review_id", isLoggedIn, deleteReviewById);


module.exports = movieRouter;
