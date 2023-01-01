import connection from "../config/db.js";

class OrgInfo {
	constructor({ id, info_field, alias, value }) {
		this.id = id;
		this.info_field = info_field;
		this.alias = alias;
		this.value = value;
	}

	static getAll(result) {
		connection.query(`SELECT * FROM org_info`, result);
	}

	static getById(id, result) {
		connection.query(`SELECT * FROM org_info WHERE id = ?`, [id], result);
	}

	static getByField(info_field, result) {
		connection.query(
			`SELECT * FROM org_info WHERE info_field = ?`,
			[info_field],
			result
		);
	}

	create(result) {
		connection.query(
			`INSERT INTO org_info
            (
                id,
                info_field,
                alias,
                value
            )
            VALUES
            (?,?,?,? )`,
			[this.id, this.info_field, this.alias, this.value],
			result
		);
	}

	update(result) {
		connection.query(
			`UPDATE org_info SET
            info_field = ?,
            alias = ?,
            value = ?
            WHERE id = ?`,
			[this.info_field, this.alias, this.value, this.id],
			result
		);
	}

	delete(result) {
		connection.query(`DELETE FROM org_info WHERE id = ?`, [this.id], result);
	}
}

export default OrgInfo;
