import Employee from "../models/employee.model.js";

export default class EmployeeCtrl {
	static async getAll(req, res) {
		Employee.getAll((err, result) => {
			if (err) {
				return res.status(500).send({
					error: "Something went wrong on our side.",
				});
			}

			return res.send(result);
		});
	}

	static async getByDepartment(req, res) {
		const { dept_id } = req.params;

		Employee.getByDepartmentID(dept_id, (err, result) => {
			if (err) {
				return res.status(500).send({
					error: "Something went wrong on our side.",
				});
			}

			return res.send(result);
		});
	}

	static async findById(req, res) {
		const { id } = req.params;

		Employee.getById(id, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send({
					error: "Something went wrong on our side.",
				});
			}

			return res.send(result);
		});
	}

	static async createNew(req, res) {
		const emp = new Employee(req.body);

		emp.create((err, result) => {
			if (err) {
				console.log(err);
				switch (err.code) {
					case "ER_DUP_ENTRY":
						return res.status(403).send({
							error: "Given employee ID already exists.",
						});
					case "ER_NO_REFERENCED_ROW_2":
						return res.status(403).send({
							error: "Invalid values provided.",
						});
					default:
						return res.status(500).send({
							error: "something went wrong on our side.",
						});
				}
			}

			res.send(result);
			return;
		});
	}

	static async updateOne(req, res) {
		const emp = new Employee(req.body);

		if (emp.supervisor_id === "") {
			emp.supervisor_id = null;
		}

		emp.edit((err, result) => {
			if (err) {
				console.log(err);
				switch (err.code) {
					case "ER_DUP_ENTRY":
						return res.status(403).send({
							error: "Given employee ID already exists.",
						});
					case "ER_NO_REFERENCED_ROW_2":
						return res.status(403).send({
							error: "Invalid values provided.",
						});
					default:
						return res.status(500).send({
							error: "something went wrong on our side.",
						});
				}
			}

			res.send(result);
			return;
		});
	}

	static async deleteOne(req, res) {
		const emp_id = req.params.id;

		Employee.remove(emp_id, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send({
					error: "Something went wrong on our side.",
				});
			}

			if (result.affectedRows == 0) {
				return res.status(404).send({
					error: "Given employee id not exists.",
				});
			}

			return res.send({ success: true, message: "Successfully deleted." });
		});
	}
}
