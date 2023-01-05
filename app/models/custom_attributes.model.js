import connection from "../config/db.js";

class CustomAttributes {
	constructor({ attr_id, attr_name, alias, data_type }) {
		this.attr_id = attr_id;
		this.attr_name = attr_name;
		this.alias = alias;
		this.data_type = data_type;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM custom_attribute`, result);
	}

	static getById(attr_id, result) {
		connection.query(
			`SELECT * FROM custom_attribute WHERE attr_id = ?`,
			[attr_id],
			result
		);
	}

	static getByField(attr_name, result) {
		connection.query(
			`SELECT * FROM custom_attribute WHERE attr_name = ?`,
			[attr_name],
			result
		);
	}

	create(result) {
		// Add new record to custom_attribute table
		connection.query(
			`INSERT INTO custom_attribute
            (
                attr_name,
                alias,
                data_type
            )
            VALUES
            (?,?,?)`,
			[this.attr_name, this.alias, this.data_type]
		);

		// Call procedure to add new column to employee_details table
		connection.query(`CALL PR_add_emp_detail (?)`, [this.attr_name], result);
	}

	update(result) {
		connection.query(
			`UPDATE custom_attribute SET 
			alias = ? WHERE attr_id = ?`,
			[this.alias, this.attr_id],
			result
		);
	}

	static delete(attr_id, attr_name, result) {
		connection.query(`DELETE FROM custom_attribute WHERE attr_id = ?`, [
			attr_id,
		]);

		// Call procedure to delete column from employee_details table
		connection.query(`CALL PR_delete_emp_detail (?)`, [attr_name], result);
	}
}

export default CustomAttributes;
