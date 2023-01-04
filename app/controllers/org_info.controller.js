import OrgInfo from "../models/org_info.model.js";

// Find a single record
export const findOne = (req, res) => {
	OrgInfo.getById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error retrieving user with id " + req.params.id,
			});
		} else res.send(data);
	});
};

// Retrieve all records from the database
export const findAll = (req, res) => {
	OrgInfo.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving records",
			});
		else res.send(data);
	});
};

// Update a record identified by the id in the request
export const update = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	const org_info = new OrgInfo(req.body.data);

	org_info.id = req.params.id;

	org_info.update((err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No record found with id ${req.params.id}`,
				});
			} else {
				res.status(500).send({
					message: "Error updating record with id " + req.params.id,
				});
			}
		} else res.send(data);
	});
};
