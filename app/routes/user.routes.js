import express from "express";
import validateToken from "../middleware/auth.middleware.js";
import * as user from "../controllers/user.controller.js";

const userRoutes = (app) => {
	const router = express.Router();

	// Create a new user
	router.post("/", validateToken, user.create);

	// Retrieve all users
	router.get("/", validateToken, user.findAll);

	// Retrieve a single user with id
	router.get("/:user_id", validateToken, user.findOne);

	// Update a user with id
	router.put("/:user_id", validateToken, user.update);

	// Delete a user with id
	router.delete("/:user_id", validateToken, user.deleteRecord);

	app.use("/api/user", router);
};

export default userRoutes;
