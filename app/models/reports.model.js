import connection from "../config/db.js";

class Reports {
	static async getEmployeesByDepartment(dept_name, result) {
		let query;
		if (dept_name == null) {
			query = `SELECT * FROM employee_info ORDER BY dept_name`;
		} else {
			query = `SELECT * FROM employee_info WHERE dept_name = ?`;
		}

		connection.query(query, [dept_name], result);
	}

	static async getLeavesByDepartment(dept_name, leave_type, result) {
		let query, parameters;
		if (dept_name == null && leave_type == null) {
			query = `SELECT * FROM leave_info`;
			parameters = [];
		} else if (dept_name == null && leave_type != null) {
			query = `SELECT * FROM leave_info WHERE leave_type = ?`;
			parameters = [leave_type];
		} else if (dept_name != null && leave_type == null) {
			query = `SELECT * FROM leave_info WHERE dept_name = ?`;
			parameters = [dept_name];
		} else {
			query = `SELECT * FROM leave_info WHERE dept_name = ? and leave_type = ?`;
			parameters = [dept_name, leave_type];
		}

		connection.query(query, parameters, result);
	}

	static async getLeaveBalance(dept_name, result) {
		let query;
		if (dept_name == null) {
			query = `SELECT * FROM leave_balance_info ORDER BY dept_name`;
		} else {
			query = `SELECT * FROM leave_balance_info WHERE dept_name = ?`;
		}

		connection.query(query, [dept_name], result);
	}

	static async getGroupedInfo(key, result) {
		let query;
		if (key === "Job Title") {
			query = `SELECT * FROM employee_info ORDER BY job_title`;
		} else if (key === "Pay Grade") {
			query = `SELECT * FROM employee_info ORDER BY paygrade_level`;
		} else if (key === "Contract") {
			query = `SELECT * FROM employee_info ORDER BY contract_type`;
		} else if (key === "Status") {
			query = `SELECT * FROM employee_info ORDER BY status_type`;
		}

		connection.query(query, result);
	}

	static async getCustomReportRecords(attributes, dept_name, result) {
		let query;
		if (dept_name == null) {
			query = `SELECT employee_info.emp_id, first_name, last_name, dept_name, ${attributes} FROM employee_info 
            INNER JOIN emp_detail on employee_info.emp_id=emp_detail.emp_id 
            ORDER BY dept_name`;
		} else {
			query = `SELECT employee_info.emp_id, first_name, last_name, dept_name, ${attributes} FROM employee_info 
            INNER JOIN emp_detail on employee_info.emp_id=emp_detail.emp_id 
            WHERE dept_name = ? 
            ORDER BY dept_name`;
		}

		console.log("query: ", query);

		connection.query(query, [dept_name], result);
	}
}

export default Reports;
