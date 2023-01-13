import connection from "../config/db.js";

class Dependant {
	constructor({
		dep_id,
		emp_id,
		dep_name,
		dep_birthdate,
		relationship_to_emp,
	}) {
		this.dep_id = dep_id;
		this.emp_id = emp_id;
		this.dep_name = dep_name;
		this.dep_birthdate = dep_birthdate;
		this.relationship_to_emp = relationship_to_emp;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM dependant`, result);
	}

	static getById(dep_id, result) {
		connection.query(
			`SELECT * FROM dependant WHERE dep_id = ?`,
			[dep_id],
			result
		);
	}

	static getByEmp(emp_id, result) {
		connection.query(
			`SELECT * FROM dependant WHERE emp_id = ?`,
			[emp_id],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO dependant
            (
                dep_id,
                emp_id,
                dep_name,
                dep_birthdate,
                relationship_to_emp,
            )
            VALUES
            (?,?,?,?,?)`,
			[
				this.dep_id,
				this.emp_id,
				this.dep_name,
				this.dep_birthdate,
				this.relationship_to_emp,
			],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE dependant
            SET
                dep_name = ?,
                dep_birthdate = ?,
                relationship_to_emp = ?
            WHERE
                dep_id = ?`,
			[
				this.dep_name,
				this.dep_birthdate,
				this.relationship_to_emp,
				this.dep_id,
			],
			result
		);
	}

	delete(result) {
		connection.query(
			`DELETE FROM dependant WHERE dep_id = ?`,
			[this.dep_id],
			result
		);
	}
}

export default Dependant;
