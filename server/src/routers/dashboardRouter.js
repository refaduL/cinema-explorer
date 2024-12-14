const express = require("express");
const { getAllUsers, getAllActors, getAllDirectors, addNewActor, updateActorById, deleteActorById, addNewDirector, updateDirectorById, deleteDirectorById } = require("../controllers/dashboardController");

const dashboardRouter = express.Router();

dashboardRouter.get("/manage-users", getAllUsers);

dashboardRouter.get("/manage-actors", getAllActors);
dashboardRouter.post("/manage-actors", addNewActor);
dashboardRouter.put("/manage-actors/:actor_id", updateActorById);
dashboardRouter.delete("/manage-actors/:actor_id", deleteActorById);

dashboardRouter.get("/manage-directors", getAllDirectors);
dashboardRouter.post("/manage-directors", addNewDirector);
dashboardRouter.put("/manage-directors/:director_id", updateDirectorById);
dashboardRouter.delete("/manage-directors/:director_id", deleteDirectorById);



// dashboardRouter.post("/signout", handleLogout);
// dashboardRouter.put("/user", fetchAuthenticatedUser);
// dashboardRouter.delete("/me", fetchAuthenticatedUser);

module.exports = dashboardRouter;
