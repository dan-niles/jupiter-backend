import Employee from "../models/employee.model.js";
import Dependant from "../models/dependant.model.js";
import EmergencyContact from "../models/emergency_contact.model.js";

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

		const { emp_id } = req.body;
		const { custom_attributes, dependants, emergency_contacts } = req.body;

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

			for (const column in custom_attributes) {
				Employee.updateEmpDetail(emp_id, column, custom_attributes[column]);
			}

			for (const key in dependants) {
				if (
					dependants[key].name != "" &&
					dependants[key].birthdate != "" &&
					dependants[key].relationship != ""
				) {
					const dep = new Dependant({
						emp_id: emp_id,
						dep_name: dependants[key].name,
						dep_birthdate: dependants[key].birthdate,
						relationship_to_emp: dependants[key].relationship,
					});
					dep.create();
				}
			}

			for (const key in emergency_contacts) {
				if (
					emergency_contacts[key].name != "" &&
					emergency_contacts[key].phone != ""
				) {
					const emer_contact = new EmergencyContact({
						emp_id: emp_id,
						contact_name: emergency_contacts[key].name,
						phone_no: emergency_contacts[key].phone,
						address: emergency_contacts[key].address,
					});

					emer_contact.create();
				}
			}

			res.send(result);
			return;
		});
	}

	static async updateOne(req, res) {
		const emp = new Employee(req.body);
		const { emp_id } = req.body;
		const { custom_attributes, dependants, emergency_contacts } = req.body;

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

			for (const column in custom_attributes) {
				Employee.updateEmpDetail(emp_id, column, custom_attributes[column]);
			}

			for (const key in dependants) {
				if (
					dependants[key].name != "" &&
					dependants[key].birthdate != "" &&
					dependants[key].relationship != ""
				) {
					const dep = new Dependant({
						emp_id: emp_id,
						dep_id: dependants[key].dep_id,
						dep_name: dependants[key].name,
						dep_birthdate: dependants[key].birthdate,
						relationship_to_emp: dependants[key].relationship,
					});
					if (dep.dep_id === null) {
						dep.create();
					} else {
						dep.update();
					}
				}
			}

			for (const key in emergency_contacts) {
				if (
					emergency_contacts[key].name != "" &&
					emergency_contacts[key].phone != ""
				) {
					const emer_contact = new EmergencyContact({
						emergency_contact_id: emergency_contacts[key].emergency_contact_id,
						emp_id: emp_id,
						contact_name: emergency_contacts[key].name,
						phone_no: emergency_contacts[key].phone,
						address: emergency_contacts[key].address,
					});
					if (emer_contact.emergency_contact_id === null) {
						emer_contact.create();
					} else {
						emer_contact.update();
					}
				}
			}

			res.send(result);
			return;
		});
	}

	// Get count of all employees
	static async getCount(req, res) {
		Employee.getCount((err, result) => {
			if (err) {
				return res.status(500).send({
					error: "Something went wrong on our side.",
				});
			}

			return res.send(result);
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
