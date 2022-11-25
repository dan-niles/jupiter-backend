import express from "express";
import * as login from "../controllers/login.controller.js";

const loginRoutes = (app) => {
	const router = express.Router();

	// Authenicating a user
	router.post("/", login.authenticate);

	app.use("/api/login", router);
};

export default loginRoutes;
