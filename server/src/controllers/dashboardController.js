const pool = require("../config/db");
const createError = require("http-errors");
const { successResponse } = require("./responseController");

const getAllUsers = async (req, res, next) => {
  try {
    const [users] = await pool.query(`SELECT * FROM users;`);

    return successResponse(res, {
      statusCode: 200,
      message: "Users retrieved successfully.",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};


const getAllActors = async (req, res, next) => {
  try {
    const [actors] = await pool.query(`SELECT * FROM actors;`);

    return successResponse(res, {
      statusCode: 200,
      message: "Actors retrieved successfully.",
      payload: actors,
    });
  } catch (error) {
    next(error);
  }
};

const addNewActor = async (req, res, next) => {
  try {
    const { actor_name, birthdate, nationality } = req.body;
    console.log(req.body);
    console.log(actor_name, birthdate, nationality);

    if (!actor_name || !birthdate || !nationality) {
      throw createError(400, "Actor name, birthdate, and nationality are required.");
    }

    const [result] = await pool.execute(
      `INSERT INTO actors (actor_name, birthdate, nationality) VALUES (?, ?, ?)`,
      [actor_name, birthdate, nationality]
    );

    const newActor = {
      actor_id: result.insertId,
      actor_name,
      birthdate,
      nationality,
    };

    return successResponse(res, {
      statusCode: 201,
      message: "Actor added successfully.",
      payload: newActor,
    });
  } catch (error) {
    console.error("Error in addActor:", error.message);
    next(error);
  }
};

const updateActorById = async (req, res, next) => {
  try {
    const { actor_id } = req.params;
    const { actor_name, birthdate, nationality } = req.body;

    if (!actor_id || !actor_name || !birthdate || !nationality) {
      throw createError(
        400,
        "Actor ID, name, birthdate, and nationality are required."
      );
    }

    await pool.execute(
      `UPDATE actors SET actor_name = ?, birthdate = ?, nationality = ? WHERE actor_id = ?`,
      [actor_name, birthdate, nationality, actor_id]
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Actor updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateActor:", error.message);
    next(error);
  }
};

const deleteActorById = async (req, res, next) => {
  try {
    const { actor_id } = req.params;

    if (!actor_id) {
      throw createError(400, "Actor ID is required.");
    }

    await pool.execute(`DELETE FROM actors WHERE actor_id = ?`, [actor_id]);

    return successResponse(res, {
      statusCode: 200,
      message: "Actor deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteActor:", error.message);
    next(error);
  }
};



const getAllDirectors = async (req, res, next) => {
  try {
    const [directors] = await pool.query(`SELECT * FROM directors;`);

    return successResponse(res, {
      statusCode: 200,
      message: "directors retrieved successfully.",
      payload: directors,
    });
  } catch (error) {
    next(error);
  }
};

const addNewDirector = async (req, res, next) => {
  try {
    const { director_name, birthdate, nationality } = req.body;

    if (!director_name || !birthdate || !nationality) {
      throw createError(400, "Director name, birthdate, and nationality are required.");
    }

    const [result] = await pool.execute(
      `INSERT INTO directors (director_name, birthdate, nationality) VALUES (?, ?, ?)`,
      [director_name, birthdate, nationality]
    );

    const newDirector = {
      director_id: result.insertId,
      director_name,
      birthdate,
      nationality,
    };

    return successResponse(res, {
      statusCode: 201,
      message: "Director added successfully.",
      payload: newDirector,
    });
  } catch (error) {
    console.error("Error in addDirector:", error.message);
    next(error);
  }
};

const updateDirectorById = async (req, res, next) => {
  try {
    const { director_id } = req.params;
    const { director_name, birthdate, nationality } = req.body;

    if (!director_id || !director_name || !birthdate || !nationality) {
      throw createError(400, "Director ID, name, birthdate, and nationality are required.");
    }

    await pool.execute(
      `UPDATE directors SET director_name = ?, birthdate = ?, nationality = ? WHERE director_id = ?`,
      [director_name, birthdate, nationality, director_id]
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Director updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateDirector:", error.message);
    next(error);
  }
};

const deleteDirectorById = async (req, res, next) => {
  try {
    const { director_id } = req.params;

    if (!director_id) {
      throw createError(400, "Director ID is required.");
    }

    await pool.execute(`DELETE FROM directors WHERE director_id = ?`, [director_id]);

    return successResponse(res, {
      statusCode: 200,
      message: "Director deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteDirector:", error.message);
    next(error);
  }
};


module.exports = {
  getAllUsers,
  getAllActors,
  addNewActor,
  updateActorById,
  deleteActorById,
  getAllDirectors,
  addNewDirector,
  updateDirectorById,
  deleteDirectorById,
};
