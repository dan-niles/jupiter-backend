import connection from "../config/db.js";

class EmergencyContact {
	constructor({
		emergency_contact_id,
		emp_id,
		contact_name,
		phone_no,
		address,
	}) {
		this.emergency_contact_id = emergency_contact_id;
		this.emp_id = emp_id;
		this.contact_name = contact_name;
		this.phone_no = phone_no;
		this.address = address;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM emergency_contact`, result);
	}

	static getById(emergency_contact_id, result) {
		connection.query(
			`SELECT * FROM emergency_contact WHERE emergency_contact_id = ?`,
			[emergency_contact_id],
			result
		);
	}

	static getByEmp(emp_id, result) {
		connection.query(
			`SELECT * FROM emergency_contact WHERE emp_id = ?`,
			[emp_id],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO emergency_contact
                (
                    emergency_contact_id,
                    emp_id,
                    contact_name,
                    phone_no,
                    address
                )
                VALUES
                (?,?,?,?,?)`,
			[
				this.emergency_contact_id,
				this.emp_id,
				this.contact_name,
				this.phone_no,
				this.address,
			],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE emergency_contact SET
                    contact_name = ?,
                    phone_no = ?,
                    address = ?
                WHERE emergency_contact_id = ?`,
			[
				this.contact_name,
				this.phone_no,
				this.address,
				this.emergency_contact_id,
			],
			result
		);
	}

	delete(result) {
		connection.query(
			`DELETE FROM emergency_contact WHERE emergency_contact_id = ?`,
			[this.emergency_contact_id],
			result
		);
	}

	static deleteById(emergency_contact_id, result) {
		connection.query(
			`DELETE FROM emergency_contact WHERE emergency_contact_id = ?`,
			[emergency_contact_id],
			result
		);
	}

	static deleteByEmp(emp_id, result) {
		connection.query(
			`DELETE FROM emergency_contact WHERE emp_id = ?`,
			[emp_id],
			result
		);
	}
}

export default EmergencyContact;
