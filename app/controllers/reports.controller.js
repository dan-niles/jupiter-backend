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

// Retrieve leaves based on the given department and leave type
export const fetchLeavesByDepartment = (req, res) => {
	const { dept_name, leave_type } = req.body;

	Reports.getLeavesByDepartment(dept_name, leave_type, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ error: "Error retrieving records." });
		}

		return res.send(result);
	});
};

// Retrieve employee info based on the given key
export const fetchGroupedInfo = (req, res) => {
	const { key } = req.body;

	Reports.getGroupedInfo(key, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ error: "Error retrieving records." });
		}

		return res.send(result);
	});
};
