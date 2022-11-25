import User from "../models/user.model.js";

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

	User.findByCredentials(username, password, (err, data) => {
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
		} else res.send(data);
	});
};
