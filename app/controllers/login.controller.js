import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Insert new user into the database
export const authenticate = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	const username = req.body.username;
	const password = req.body.password;

	// Retrieve user with same username from the database
	User.findByCredentials(username, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Invalid credentials!`,
				});
			} else {
				res.status(500).send({
					message: "Error! Please try again later.",
				});
			}
		} else {
			// Compare password
			if (bcrypt.compareSync(password, data.password)) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Invalid credentials!`,
				});
			}
		}
	});
};
