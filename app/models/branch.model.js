import connection from "../config/db.js";

export default class Branch {
    constructor(branch_id, branch_name, address, country) {
        this.branch_id = branch_id;
        this.branch_name = branch_name;
        this.address = address;
        this.country = country;
    }

    create(handleDBResponse) {
        connection.query(
            `INSERT INTO branch
            (
                branch_name,
                address,
                country
            ) 
                VALUES (?, ?, ?)`,
            [this.branch_name, this.address, this.country],
            handleDBResponse
        )
    }

    static getAll(handleDBResponse) {
        connection.query(
            `SELECT * FROM branch`,
            handleDBResponse
        )
    }

    static getById(branch_id, handleDBResponse) {
        connection.query(
            `SELECT * FROM branch WHERE branch_id = ?`,
            [branch_id],
            handleDBResponse
        )
    }

    updateById(handleDBResponse) {
        connection.query(
            `UPDATE branch SET 
                branch_name = ?
                country = ?
                address = ?
                WHERE branch_id = ?
            `,
            [
                this.branch_name,
                this.country,
                this.address,
                this.branch_id
            ],
            handleDBResponse
        )
    }
}
