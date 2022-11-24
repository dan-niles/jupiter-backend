import User from "../models/user.model.js";

// Insert new user into the database
export const create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Create a user object
	const user = new User({
		emp_id: req.body.emp_id,
		role: req.body.role,
		username: req.body.username,
		password: req.body.password,
	});

	// Save user in the database
	User.create(user, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while creating the user",
			});
		else res.send(data);
	});
};

// Retrieve all users from the database
export const findAll = (req, res) => {
	const emp_id = req.query.emp_id;

	User.getAll(emp_id, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving users",
			});
		else res.send(data);
	});
};
