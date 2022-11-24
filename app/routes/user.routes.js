import express from "express";
import * as user from "../controllers/user.controller.js";

const userRoutes = (app) => {
	const router = express.Router();

	// Create a new user
	router.post("/", user.create);

	// Retrieve all users
	router.get("/", user.findAll);

	// Retrieve a single user with id
	// router.get("/:id", user.findOne);

	// // Update a user with id
	// router.put("/:id", user.update);

	// // Delete a user with id
	// router.delete("/:id", user.delete);

	app.use("/api/user", router);
};

export default userRoutes;
