import connection from "../config/db.js";

class Department {
	constructor({ dept_id, dept_name, dept_code }) {
		this.dept_id = dept_id;
		this.dept_name = dept_name;
		this.dept_code = dept_code;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM department`, result);
	}

	static getById(dept_id, result) {
		connection.query(
			`SELECT * FROM department WHERE dept_id = ?`,
			[dept_id],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO department
                (
                    dept_name,
                    dept_code
                )
                VALUES
                (?,?)`,
			[this.dept_name, this.dept_code],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE department SET
                    dept_name = ?,
                    dept_code = ?
                WHERE
                    dept_id = ?`,
			[this.dept_name, this.dept_code, this.dept_id],
			result
		);
	}

	static delete(dept_id, result) {
		connection.query(
			`DELETE FROM department WHERE dept_id = ?`,
			[dept_id],
			result
		);
	}
}

<<<<<<< HEAD
export default Department;
=======

>>>>>>> 84bcc7b (leave controller created.)
