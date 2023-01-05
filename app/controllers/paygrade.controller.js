import Paygrade from "../models/paygrade.model.js";

// Insert new paygrade level into the database
export const create = (req, res) => {
	// Validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Create a paygrade object
	const paygrade = new Paygrade({ ...req.body.data });

	// Save paygrade in the database
	paygrade.create((err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the paygrade",
			});
		} else res.send(data);
	});
};

// Find a single attribute with a paygrade_id
export const findOne = (req, res) => {
	Paygrade.findById(req.params.paygrade_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No paygrade found with paygrade_id ${req.params.paygrade_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving paygrade with paygrade_id " +
						req.params.paygrade_id,
				});
			}
		} else res.send(data);
	});
};

// Retrieve all custom attributes from the database
export const findAll = (req, res) => {
	Paygrade.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving attributes",
			});
		else res.send(data);
	});
};

// Update a paygrade identified by the paygrade_id in the request
export const update = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	const paygrade = new Paygrade(req.body.data);

	paygrade.paygrade_id = req.params.paygrade_id;

	paygrade.updateById((err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No paygrade level found with paygrade_id ${req.params.paygrade_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating paygrade level with paygrade_id " +
						req.params.paygrade_id,
				});
			}
		} else res.send(data);
	});
};

// Delete a paygrade with the specified paygrade_id in the request
export const remove = (req, res) => {
	Paygrade.remove(req.params.paygrade_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No paygrade found with paygrade_id ${req.params.paygrade_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Could not delete paygrade with paygrade_id " +
						req.params.paygrade_id,
				});
			}
		} else res.send({ message: `Paygrade level was deleted successfully!` });
	});
};
