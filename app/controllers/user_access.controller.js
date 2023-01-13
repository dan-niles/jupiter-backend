import UserAccess from "../models/user_access.model.js";

// Find if record exists for given role and access level
export const findRecord = (req, res) => {
	const { role, access_level } = req.body;

	console.log(req.body);

	UserAccess.getByAccessLevel(role, access_level, (err, data) => {
		if (err) {
			console.log(err);
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `No record found`,
				});
			} else {
				res.status(500).send({
					message: "Error retrieving record",
				});
			}
		} else res.send(data);
	});
};
