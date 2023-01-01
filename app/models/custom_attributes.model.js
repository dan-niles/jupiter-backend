import connection from "../config/db.js";

class CustomAttributes {
	constructor({ atttr_id, attr_name, alias, data_type }) {
		this.atttr_id = atttr_id;
		this.attr_name = attr_name;
		this.alias = alias;
		this.data_type = data_type;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM custom_attribute`, result);
	}

	static getById(atttr_id, result) {
		connection.query(
			`SELECT * FROM custom_attribute WHERE atttr_id = ?`,
			[atttr_id],
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
                atttr_id,
                attr_name,
                alias,
                data_type
            )
            VALUES
            (?,?,?,? )`,
			[this.atttr_id, this.attr_name, this.alias, this.data_type],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE custom_attribute SET
            attr_name = ?,
            alias = ?,
            data_type = ?
            WHERE atttr_id = ?`,
			[this.attr_name, this.alias, this.data_type, this.atttr_id],
			result
		);
	}

	delete(result) {
		connection.query(
			`DELETE FROM custom_attribute WHERE atttr_id = ?`,
			[this.atttr_id],
			result
		);
	}
}

export default CustomAttributes;
