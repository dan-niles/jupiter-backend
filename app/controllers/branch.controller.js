import Branch from "../models/branch.model.js";

// Insert new branch into the database
export const create = (req, res) => {
	// Validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	console.log(req.body.data);

	// Create a branch object
	const branch = new Branch(
		null,
		req.body.data.branch_name,
		req.body.data.address,
		req.body.data.country
	);

	// Save branch in the database
	branch.create((err, data) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Some error occurred while creating the branch",
			});
		} else res.send(data);
	});
};

// Find a single attribute with a branch_id
export const findOne = (req, res) => {
	Branch.findById(req.params.branch_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No branch found with branch_id ${req.params.branch_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving branch with branch_id " + req.params.branch_id,
				});
			}
		} else res.send(data);
	});
};

// Retrieve all branches from the database
export const findAll = (req, res) => {
	Branch.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving branches",
			});
		else res.send(data);
	});
};

// Get count of all branches
export const getCount = (req, res) => {
	Branch.getCount((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			});
		return res.send(data);
	});
};

// Update a branch identified by the branch_id in the request
export const update = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	req.body.data;
	const branch = new Branch(
		req.body.data.branch_id,
		req.body.data.branch_name,
		req.body.data.address,
		req.body.data.country
	);

	console.log(branch);

	// branch.branch_id = req.params.branch_id;

	branch.updateById((err, data) => {
		if (err) {
			console.log(err);
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No branch level found with branch_id ${req.params.branch_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating branch level with branch_id " +
						req.params.branch_id,
				});
			}
		} else res.send(data);
	});
};

// Delete a branch with the specified branch_id in the request
export const remove = (req, res) => {
	Branch.remove(req.params.branch_id, (err, data) => {
		if (err) {
			console.log(err);
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No branch found with branch_id ${req.params.branch_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Could not delete branch with branch_id " + req.params.branch_id,
				});
			}
		} else res.send({ message: `Branch level was deleted successfully!` });
	});
};
