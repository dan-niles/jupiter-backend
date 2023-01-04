import CustomAttr from "../models/custom_attributes.model.js";

// Insert new custom attribute into the database
export const create = (req, res) => {
	// Validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// Create a custom_attr object
	const custom_attr = new CustomAttr({ ...req.body.data });

	// Save custom_attr in the database
	custom_attr.create((err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the custom_attr",
			});
		} else res.send(data);
	});
};

// Find a single attribute with a attr_id
export const findOne = (req, res) => {
	CustomAttr.findById(req.params.attr_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No custom_attr found with attr_id ${req.params.attr_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving custom_attr with attr_id " + req.params.attr_id,
				});
			}
		} else res.send(data);
	});
};

// Retrieve all custom attributes from the database
export const findAll = (req, res) => {
	CustomAttr.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving attributes",
			});
		else res.send(data);
	});
};

// Update a custom_attr identified by the attr_id in the request
export const update = (req, res) => {
	// Validate Request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	const custom_attr = new CustomAttr(req.body.data);

	custom_attr.attr_id = req.params.attr_id;

	console.log(custom_attr.attr_id);

	custom_attr.update((err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No custom attribute found with attr_id ${req.params.attr_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error updating custom attribute with attr_id " +
						req.params.attr_id,
				});
			}
		} else res.send(data);
	});
};

// Delete a custom_attr with the specified attr_id in the request
export const remove = (req, res) => {
	CustomAttr.remove(req.params.attr_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No custom_attr found with attr_id ${req.params.attr_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Could not delete custom_attr with attr_id " + req.params.attr_id,
				});
			}
		} else res.send({ message: `Custom attribute was deleted successfully!` });
	});
};
