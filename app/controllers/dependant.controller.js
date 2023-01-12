import Dependant from "../models/dependant.model";

// insert new dependant into the database
export const create = (req, res) => {
	// validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	// create a dependant object
	const dependant = new Dependant({ ...req.body.data });

	// save dependant in the database
	dependant.create((err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the dependant",
			});
		} else res.send(data);
	});
};

// find a single dependant with a dep_id
export const findOne = (req, res) => {
	Dependant.findById(req.params.dep_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No dependant found with dep_id ${req.params.dep_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving dependant with dep_id " + req.params.dep_id,
				});
			}
		} else res.send(data);
	});
};

// retrieve all dependants from the database
export const findAll = (req, res) => {
	Dependant.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving dependants",
			});
		else res.send(data);
	});
};

// update a dependant identified by the dep_id in the request
export const update = (req, res) => {
	// validate request
	if (!req.body.data) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	Dependant.updateById(
		req.params.dep_id,
		new Dependant({ ...req.body.data }),
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `No dependant found with dep_id ${req.params.dep_id}`,
					});
				} else {
					res.status(500).send({
						message:
							"Error updating dependant with dep_id " + req.params.dep_id,
					});
				}
			} else res.send(data);
		}
	);
};

// delete a dependant with the specified dep_id in the request
export const deleteOne = (req, res) => {
	Dependant.remove(req.params.dep_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No dependant found with dep_id ${req.params.dep_id}`,
				});
			} else {
				res.status(500).send({
					message:
						"Could not delete dependant with dep_id " + req.params.dep_id,
				});
			}
		} else res.send({ message: `Dependant was deleted successfully!` });
	});
};

// delete all dependants from the database
export const deleteAll = (req, res) => {
	Dependant.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all dependants",
			});
		else res.send({ message: `All dependants were deleted successfully!` });
	});
};
