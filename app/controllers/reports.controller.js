import Reports from "../models/reports.model.js";

// Retrieve employees based on the given department
export const fetchEmployeesByDepartment = (req, res) => {
	const { dept_name } = req.body;

	Reports.getEmployeesByDepartment(dept_name, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ error: "Error retrieving records." });
		}

		return res.send(result);
	});
};
