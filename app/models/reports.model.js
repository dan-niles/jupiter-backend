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
}

export default Reports;
