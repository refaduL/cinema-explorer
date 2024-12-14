const createError = require("http-errors");
const { successResponse } = require("./responseController");
const pool = require("../config/db");

const getReviewsByMovieId = async (req, res, next) => {
  try {
    const { movie_id } = req.params;

    const [movie] = await pool.query(
      `SELECT * FROM movies WHERE movie_id = ?`,
      [movie_id]
    );
    if (movie.length === 0) {
      throw createError(404, "Movie not found.");
    }

    // Fetch reviews
    const [reviews] = await pool.query(
      `SELECT r.review_id, r.rating, r.review, r.review_date, u.user_id, u.name 
         FROM reviews r
         JOIN users u ON r.user_id = u.user_id
         WHERE r.movie_id = ?`,
      [movie_id]
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Reviews fetched successfully.",
      payload: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const addReviewToMovie = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const { rating, review } = req.body;
    const user_id = req.user.id;

    // throw new Error("Process terminated intensionally");

    if (!movie_id || !rating || rating < 1 || rating > 10) {
      throw createError(
        400,
        "Movie ID and a rating between 1 and 10 are required."
      );
    }

    const [movie] = await pool.query(
      `SELECT * FROM movies WHERE movie_id = ?`,
      [movie_id]
    );
    if (movie.length === 0) {
      throw createError(404, "Movie not found.");
    }

    const [existingReview] = await pool.query(
      `SELECT * FROM reviews WHERE user_id = ? AND movie_id = ?`,
      [user_id, movie_id]
    );

    if (existingReview.length > 0) {
      throw createError(400, "You have already reviewed this movie.");
    }

    // Inserting the review
    const [result] = await pool.execute(
      `INSERT INTO reviews (user_id, movie_id, rating, review) VALUES (?, ?, ?, ?)`,
      [user_id, movie_id, rating, review || null]
    );

    const newReview = {
      review_id: result.insertId,
      movie_id,
      user_id,
      rating,
      review,
    };

    return successResponse(res, {
      statusCode: 201,
      message: "Review added successfully.",
      payload: newReview,
    });
  } catch (error) {
    next(error);
  }
};

const updateReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params; 
    const { movie_id, rating, review } = req.body; 
    const user_id = req.user.id; 

    // checking the review exists and belongs to the user
    const [existingReview] = await pool.query(
      `SELECT * FROM reviews WHERE review_id = ? AND user_id = ?`,
      [review_id, user_id]
    );

    if (existingReview.length === 0) {
      throw createError(
        404,
        "Review not found."
      );
    }

    if (rating && (rating < 1 || rating > 10)) {
      throw createError(400, "Rating must be between 1 and 10.");
    }

    // Prepare update query
    const updates = [];
    const values = [];
    if (rating !== undefined) {
      updates.push("rating = ?");
      values.push(rating);
    }
    if (review !== undefined) {
      updates.push("review = ?");
      values.push(review);
    }

    if (updates.length > 0) {
      values.push(review_id); // Added review_id for the WHERE clause
      const updateQuery = `UPDATE reviews SET ${updates.join(
        ", "
      )} WHERE review_id = ?`;
      await pool.execute(updateQuery, values);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Review updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const user_id = req.user.id;

    const [existingReview] = await pool.query(
      `SELECT * FROM reviews WHERE review_id = ? AND user_id = ?`,
      [review_id, user_id]
    );

    if (existingReview.length === 0) {
      throw createError(404, "Review not found");
    }

    // Deleting the review
    await pool.execute(`DELETE FROM reviews WHERE review_id = ?`, [review_id]);

    return successResponse(res, {
      statusCode: 200,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviewsByMovieId,
  addReviewToMovie,
  deleteReviewById,
  updateReviewById,
};
