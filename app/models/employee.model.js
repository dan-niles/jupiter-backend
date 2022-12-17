
import connection from "../config/db.js"


class Employee {
	constructor(
		emp_id,
		full_name,
		first_name,
		last_name,
		birthdate,
		marital_status,
		dept_id,
		email,
		nic,
		status_id,
		contract_id,
		title_id,
		supervisor_id,
		paygrade_id
	) {
		this.emp_id = emp_id
		this.full_name = full_name
		this.first_name = first_name
		this.last_name = last_name
		this.birthdate = birthdate
		this.marital_status = marital_status
		this.dept_id = dept_id
		this.email = email
		this.nic = nic
		this.status_id = status_id
		this.contract_id = contract_id
		this.title_id = title_id
		this.supervisor_id = supervisor_id
		this.paygrade_id = paygrade_id
	}

	static getAll(result) {
		connection.query(
			`SELECT * FROM employee`,
			(err, res) => {
				if (err) {
					result(null, res)
					return
				}

				result(null, res)
			}
		)
	}

	static getById(emp_id, result) {
		connection.query(
			`SELECT * FROM employee WHERE emp_id = ?`,
			[emp_id],
			(err, res) => {
				if (err) {
					return result(null, res)
				}

				result(null, res)
			}
		)
	}

	create(result) {
		connection.query(
			`INSERT INTO employee
			(
				emp_id,
				full_name,
				first_name,
				last_name,
				birthdate,
				marital_status,
				dept_id,
				email,
				nic,
				status_id,
				contract_id,
				title_id,
				supervisor_id,
				paygrade_id
			)
			VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				this.emp_id,
				this.full_name,
				this.first_name,
				this.last_name,
				this.birthdate,
				this.marital_status,
				this.dept_id,
				this.email,
				this.nic,
				this.status_id,
				this.contract_id,
				this.title_id,
				this.supervisor_id,
				this.paygrade_id
			],
			(err, res) => {
				if (err) {
					return result(null, err)
				}

				result(null, res)
			}
		)
	}

	edit(result) {
		connection.query(
			`UPDATE employee SET
				full_name = ?,
				first_name = ?,
				last_name = ?,
				birthdate = ?,
				marital_status = ?,
				dept_id = ?,
				email = ?,
				nic = ?,
				status_id = ?,
				contract_id = ?,
				title_id = ?,
				supervisor_id = ?,
				paygrade_id = ?,
			WHERE
				emp_id = ?
			`,
			[
				this.full_name,
				this.first_name,
				this.last_name,
				this.birthdate,
				this.marital_status,
				this.dept_id,
				this.email,
				this.nic,
				this.status_id,
				this.contract_id,
				this.title_id,
				this.supervisor_id,
				this.paygrade_id,
				this.emp_id
			],
			(err, res) => {
				if (err) {
					return result(err, null)
				}
				return result(null, res)
			}
		)
	}

	static remove(emp_id, result) {
		connection.query(
			`DELETE FROM employee WHERE emp_id = ?`,
			[emp_id],
			(err, res) => {
				if (err) {
					return result(null, err)
				}

				if (res.affectedRows === 0) {
					return result({ error: `user with id ${emp_id} not found.` })
				}

				result(null, res)
			}
		)
	}
}

export default Employee
