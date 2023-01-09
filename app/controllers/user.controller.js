import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Insert new user into the database
export const create = (req, res) => {
	// Validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Encrypt password before storing in database
	const password_hash = bcrypt.hashSync(req.body.data.password, 10);

	// Create a user object
	const user = new User({ ...req.body.data, password: password_hash });

	// Save user in the database
	user.create((err, data) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(409).send({
					message: "Username already exists",
				});
			} else {
				res.status(500).send({
					message: err.message || "Some error occurred while creating the user",
				});
			}
		} else res.send(data);
	});
};

// Find a single user with a user_id
export const findOne = (req, res) => {
	User.findById(req.params.user_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No user found with user_id ${req.params.user_id}`,
				});
			} else {
				res.status(500).send({
					message: "Error retrieving user with user_id " + req.params.user_id,
				});
			}
		} else res.send(data);
	});
};

// Retrieve all users from the database
export const findAll = (req, res) => {

	const { user_id } = req.user


	User.getAll(user_id, (err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Some error occurred while retrieving users",
			});
		return res.send(data);
	});
};

// Update a user identified by the user_id in the request
export const update = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Encrypt password before storing in database
	const password_hash = bcrypt.hashSync(req.body.data.password, 10);

	const user = new User({ ...req.body.data, password: password_hash });

	user.user_id = req.params.user_id;

	user.updateById((err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No user found with user_id ${req.params.user_id}`,
				});
			} else {
				res.status(500).send({
					message: "Error updating user with user_id " + req.params.user_id,
				});
			}
		} else res.send(data);
	});
};

// Update password for a user identified by the user_id in the request
export const changePassword = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	User.findById(req.params.user_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Invalid user ID!`,
				});
			} else {
				res.status(500).send({
					message: "Error! Please try again later.",
				});
			}
		} else {
			// Compare password
			if (bcrypt.compareSync(req.body.data.old_password, data.password)) {
				// Encrypt password before storing in database
				const password_hash = bcrypt.hashSync(req.body.data.new_password, 10);

				const user = new User({ ...req.body.data, password: password_hash });

				user.user_id = req.params.user_id;

				user.updatePassword((err, data) => {
					if (err) {
						console.log(err);
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `No user found with user_id ${req.params.user_id}`,
							});
						} else {
							res.status(500).send({
								message:
									"Error updating user with user_id " + req.params.user_id,
							});
						}
					} else res.send(data);
				});
			} else {
				res.status(404).send({
					message: `INVALID_CURR_PW`,
				});
			}
		}
	});
};

// Delete a user with the specified user_id in the request
export const remove = (req, res) => {
	User.remove(req.params.user_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No user found with user_id ${req.params.user_id}`,
				});
			} else {
				res.status(500).send({
					message: "Could not delete user with user_id " + req.params.user_id,
				});
			}
		} else res.send({ message: `User was deleted successfully!` });
	});
};
