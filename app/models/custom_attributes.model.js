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
		connection.query(
			`INSERT INTO custom_attribute
            (
                attr_id,
                attr_name,
                alias,
                data_type
            )
            VALUES
            (?,?,?,? )`,
			[this.attr_id, this.attr_name, this.alias, this.data_type],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE custom_attribute SET 
			alias = ? WHERE attr_id = ?`,
			[this.alias, this.attr_id],
			result
		);
	}

	static delete(attr_id, result) {
		connection.query(
			`DELETE FROM custom_attribute WHERE attr_id = ?`,
			[attr_id],
			result
		);
	}
}

export default CustomAttributes;
