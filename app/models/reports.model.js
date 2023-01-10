import connection from "../config/db.js";

class Reports {
	static async getEmployeesByDepartment(dept_name, result) {
		let query;
		if (dept_name == null) {
			query = `SELECT * FROM employee_by_department`;
		} else {
			query = `SELECT * FROM employee_by_department WHERE dept_name = ?`;
		}

		connection.query(query, [dept_name], result);
	}

	static async getLeavesByDepartment(dept_name, leave_type, result) {
		let query, parameters;
		if (dept_name == null && leave_type == null) {
			query = `SELECT * FROM leaves_by_department`;
			parameters = [];
		} else if (dept_name == null && leave_type != null) {
			query = `SELECT * FROM leaves_by_department WHERE leave_type = ?`;
			parameters = [leave_type];
		} else if (dept_name != null && leave_type == null) {
			query = `SELECT * FROM leaves_by_department WHERE dept_name = ?`;
			parameters = [dept_name];
		} else {
			query = `SELECT * FROM leaves_by_department WHERE dept_name = ? and leave_type = ?`;
			parameters = [dept_name, leave_type];
		}

		connection.query(query, parameters, result);
	}
}

export default Reports;
