const pool = require("../config/db");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const {
  generatePosterUrl,
  findOrCreateByName,
} = require("../helper/movieHelper");

const getAllMovies = async (req, res, next) => {
  try {
    const [movies] = await pool.query(`
      SELECT 
          m.*,
          GROUP_CONCAT(DISTINCT g.genre_name) AS genres,
          GROUP_CONCAT(DISTINCT a.actor_name) AS actors,
          GROUP_CONCAT(DISTINCT d.director_name) AS directors,
          COALESCE(AVG(r.rating), 0) AS avg_rating
      FROM movies m
      LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.genre_id
      LEFT JOIN movie_actors ma ON m.movie_id = ma.movie_id
      LEFT JOIN actors a ON ma.actor_id = a.actor_id
      LEFT JOIN movie_directors md ON m.movie_id = md.movie_id
      LEFT JOIN directors d ON md.director_id = d.director_id
      LEFT JOIN reviews r ON m.movie_id = r.movie_id
      GROUP BY m.movie_id;
    `);
  

    return successResponse(res, {
      statusCode: 200,
      message: "Movies retrieved successfully.",
      payload: movies,
    });
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [movies] = await pool.query(
      `
      SELECT m.*, 
             GROUP_CONCAT(DISTINCT g.genre_name) AS genres,
             GROUP_CONCAT(DISTINCT a.actor_name) AS actors,
             GROUP_CONCAT(DISTINCT d.director_name) AS directors
      FROM movies m
      LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.genre_id
      LEFT JOIN movie_actors ma ON m.movie_id = ma.movie_id
      LEFT JOIN actors a ON ma.actor_id = a.actor_id
      LEFT JOIN movie_directors md ON m.movie_id = md.movie_id
      LEFT JOIN directors d ON md.director_id = d.director_id
      WHERE m.movie_id = ?
      GROUP BY m.movie_id;
    `,
      [id]
    );

    if (movies.length === 0) {
      throw createError(404, "Movie not found with this id.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Movie retrieved successfully.",
      payload: movies[0],
    });
  } catch (error) {
    console.error("Error in getMovieById:", error.message);
    next(error);
  }
};

const addNewMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      genres,
      actors,
      directors,
      release_date,
      duration,
      trailer_url,
      isUpcoming,
      isNewRelease,
      isTrending,
    } = req.body;

    if (!title || !release_date || !duration) {
      throw createError(400, "Title, release date, and duration are required.");
    }

    // Handle poster upload (file from form-data)
    const poster = req.file.path;
    if (poster) {
      poster_url = `/movie_posters/${req.file.filename}`;
    } else {
      poster_url = `movie_posters/default_poster.jpg`;
    }

    // Insert movie into the database
    const [result] = await pool.execute(
      `INSERT INTO movies (title, description, release_date, duration, poster_url, trailer_url, isUpcoming, isNewRelease, isTrending)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        release_date,
        duration,
        poster_url,
        trailer_url || null,
        isUpcoming === "true", // Convert string to boolean
        isNewRelease === "true", // Convert string to boolean
        isTrending === "true", // Convert string to boolean
      ]
    );

    const movieId = result.insertId;

    // Handle Genres
    const genreNames = genres ? genres.split(",").map((g) => g.trim()) : [];
    const genreIds = await Promise.all(
      genreNames.map((name) =>
        findOrCreateByName(name, "genres", "genre_id", "genre_name")
      )
    );

    const genreValues = genreIds.map((genreId) => [movieId, genreId]);
    if (genreValues.length > 0) {
      await pool.query(
        `INSERT INTO movie_genres (movie_id, genre_id) VALUES ?`,
        [genreValues]
      );
    }

    // Handle Actors
    const actorNames = actors ? actors.split(",").map((a) => a.trim()) : [];
    const actorIds = await Promise.all(
      actorNames.map((name) =>
        findOrCreateByName(name, "actors", "actor_id", "actor_name")
      )
    );

    const actorValues = actorIds.map((actorId) => [movieId, actorId]);
    if (actorValues.length > 0) {
      await pool.query(
        `INSERT INTO movie_actors (movie_id, actor_id) VALUES ?`,
        [actorValues]
      );
    }

    // Handle Directors
    const directorNames = directors
      ? directors.split(",").map((d) => d.trim())
      : [];
    const directorIds = await Promise.all(
      directorNames.map((name) =>
        findOrCreateByName(name, "directors", "director_id", "director_name")
      )
    );

    const directorValues = directorIds.map((directorId) => [movieId, directorId]);
    if (directorValues.length > 0) {
      await pool.query(
        `INSERT INTO movie_directors (movie_id, director_id) VALUES ?`,
        [directorValues]
      );
    }

    const newMovie = {
      movieId,
      title,
      description,
      release_date,
      duration,
      poster_url,
      trailer_url,
      genres: genreNames,
      actors: actorNames,
      directors: directorNames,
      isUpcoming: isUpcoming === "true",
      isNewRelease: isNewRelease === "true",
      isTrending: isTrending === "true",
    };

    return successResponse(res, {
      statusCode: 201,
      message: "Movie created successfully.",
      payload: newMovie,
    });
  } catch (error) {
    console.error("Error in addNewMovie:", error.message);
    next(error);
  }
};

const updateMovieById = async (req, res, next) => {
  try {
    const { id } = req.params; // Movie ID from URL parameters
    console.log("movie id : ", id);
    const {
      title,
      description,
      release_date,
      duration,
      trailer_url,
      genres,
      actors,
      directors,
    } = req.body;

    // Check if the movie exists
    const [existingMovie] = await pool.query(
      `SELECT * FROM movies WHERE movie_id = ?`,
      [id]
    );
    if (existingMovie.length === 0) {
      throw createError(404, "Movie not found.");
    }

    // Update basic movie details if provided
    const updates = [];
    const values = [];
    if (title) {
      updates.push("title = ?");
      values.push(title);
    }
    if (description) {
      updates.push("description = ?");
      values.push(description);
    }
    if (release_date) {
      updates.push("release_date = ?");
      values.push(release_date);
    }
    if (duration) {
      updates.push("duration = ?");
      values.push(duration);
    }
    if (trailer_url) {
      updates.push("trailer_url = ?");
      values.push(trailer_url);
    }

    // Generate a new poster_url if the title is updated
    if (title) {
      const poster_url = generatePosterUrl(title);
      updates.push("poster_url = ?");
      values.push(poster_url);
    }

    // If there are updates, run the query
    if (updates.length > 0) {
      values.push(id); // Add movie_id for the WHERE clause
      const updateQuery = `UPDATE movies SET ${updates.join(", ")} WHERE movie_id = ?`;
      await pool.execute(updateQuery, values);
    }

    // Update genres, actors, and directors
    if (genres) {
      const genreNames = genres.split(",").map((g) => g.trim());
      const genreIds = await Promise.all(
        genreNames.map((name) =>
          findOrCreateByName(name, "genres", "genre_id", "genre_name")
        )
      );

      // Remove existing genres and add updated ones
      await pool.execute(`DELETE FROM movie_genres WHERE movie_id = ?`, [id]);
      const genreValues = genreIds.map((genreId) => [id, genreId]);
      await pool.query(
        `INSERT INTO movie_genres (movie_id, genre_id) VALUES ?`,
        [genreValues]
      );
    }

    if (actors) {
      const actorNames = actors.split(",").map((a) => a.trim());
      const actorIds = await Promise.all(
        actorNames.map((name) =>
          findOrCreateByName(name, "actors", "actor_id", "actor_name")
        )
      );

      // Remove existing actors and add updated ones
      await pool.execute(`DELETE FROM movie_actors WHERE movie_id = ?`, [id]);
      const actorValues = actorIds.map((actorId) => [id, actorId]);
      await pool.query(
        `INSERT INTO movie_actors (movie_id, actor_id) VALUES ?`,
        [actorValues]
      );
    }

    if (directors) {
      const directorNames = directors.split(",").map((d) => d.trim());
      const directorIds = await Promise.all(
        directorNames.map((name) =>
          findOrCreateByName(name, "directors", "director_id", "director_name")
        )
      );

      // Remove existing directors and add updated ones
      await pool.execute(`DELETE FROM movie_directors WHERE movie_id = ?`, [id]);
      const directorValues = directorIds.map((directorId) => [id, directorId]);
      await pool.query(
        `INSERT INTO movie_directors (movie_id, director_id) VALUES ?`,
        [directorValues]
      );
    }


    return successResponse(res, {
      statusCode: 200,
      message: "Movie updated successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existingMovie] = await pool.query("SELECT title FROM movies WHERE movie_id = ?", [id]);
    if (existingMovie.length === 0) {
      throw createError(404, "Movie not found.");
    }

    await pool.execute("DELETE FROM movies WHERE movie_id = ?", [id]);

    return successResponse(res, {
      statusCode: 200,
      message: `Movie titled "${existingMovie[0].title}" deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};



const getAllFavoriteMovies = async (req, res, next) => {
  try {
      const { user_id } = req.query;
      console.log("\nDebugging for AllFav-----------------user_id");
      console.log(user_id);
      const [favorites] = await pool.query(`
          SELECT m.movie_id, m.title, m.poster_url, m.release_date
          FROM favorites f
          JOIN movies m ON f.movie_id = m.movie_id
          WHERE f.user_id = ?
      `, [user_id]);
      
      return successResponse(res, {
        statusCode: 200,
        message: "Favorite movies retrieved successfully.",
        payload: favorites,
      });
  } catch (error) {
      next(error);
  }
}

const addToFavorites = async (req, res, next) => {
  try {
    const { movie_id } = req.params; // Extract movie_id from route params
    // const { userId } = req.query; // Extract userId from query params
    const { userId } = req.body; 

    if (!movie_id || !userId) {
      throw createError(400, "Missing required parameters: movie_id or userId.");
    }

    // Check for duplicate favorite entry
    const [existingFavorite] = await pool.query(
      "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?",
      [userId, movie_id]
    );

    if (existingFavorite.length > 0) {
      throw createError(409, "This movie is already in the user's favorites.");
    }

    // Insert into favorites table
    await pool.query(
      "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)",
      [userId, movie_id]
    );

    return successResponse(res, {
      statusCode: 201,
      message: "Movie added to favorites successfully.",
    });
  } catch (error) {
    console.error("Error in addToFavorites:", error.message);
    next(error);
  }
};

const removeFromFavorites = async (req, res, next) => {
  try {
    const { movie_id } = req.params; 
    const { userId } = req.query; 

    // Validate input
    if (!movie_id || !userId)
      throw createError(400, "Missing required parameters: movie_id or userId.");
     
    // Check if the favorite exists
    const [existingFavorite] = await pool.query(
      "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?",
      [userId, movie_id]
    );

    if (existingFavorite.length === 0) {
      throw createError(404, "Favorite entry not found.");
    }

    // Remove the favorite entry
    await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
      [userId, movie_id]
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Movie removed from favorites successfully.",
    });
  } catch (error) {
    console.error("Error in removeFromFavorites:", error.message);
    next(error); // Pass the error to the next middleware
  }
};


const getAllWatchlistedMovies = async (req, res) => {
  try {
      const { user_id } = req.query;
      console.log("\nDebugging for WL-----------------user_id");
      console.log(user_id);
      const [watchlist] = await pool.query(`
          SELECT m.movie_id, m.title, m.poster_url, m.release_date
          FROM watchlist w
          JOIN movies m ON w.movie_id = m.movie_id
          WHERE w.user_id = ?
      `, [user_id]);

      return successResponse(res, {
        statusCode: 200,
        message: "Watch List retrieved successfully.",
        payload: watchlist,
      });
  } catch (error) {
      res.status(500).json({ message: "Error fetching watchlist", error: error.message });
  }
}

const addToWatchlist = async (req, res) => {
  try {
      const { movie_id } = req.params;
      const { userId } = req.body;
      await pool.query(
          "INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)",
          [userId, movie_id]
      );
      res.status(201).json({ message: "Movie added to watchlist" });
  } catch (error) {
      res.status(500).json({ message: "Error adding to watchlist", error: error.message });
  }
}

const removeFromWatchlist = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const { userId } = req.query; 
      await pool.query(
          "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?",
          [userId, movie_id]
      );
      return successResponse(res, {
        statusCode: 200,
        message: "Movie removed from watchlist.",
        payload: {},
      });
  } catch (error) {
      res.status(500).json({ message: "Error removing from watchlist", error: error.message });
  }
}



module.exports = {
  getAllMovies,
  getMovieById,
  addNewMovie,
  updateMovieById,
  deleteMovieById,
  getAllFavoriteMovies,
  addToFavorites,
  removeFromFavorites,
  getAllWatchlistedMovies,
  addToWatchlist,
  removeFromWatchlist,
};
