import connection from "../config/db.js";


class Contract {

    constructor(contract_id, type) {
        this.contract_id = contract_id;
        this.type = type;
    }

    static getAll(handleDBResponse) {
        connection.query(
            `SELECT * FROM contract`,
            handleDBResponse
        )
    }

    static getById(contract_id, handleDBResponse) {
        connection.query(
            `SELECT * FROM contract WHERE contract_id = ?`,
            [contract_id],
            handleDBResponse
        )
    }

    createNew(handleDBResponse) {
        connection.query(
            `INSERT INTO contract(type)
            VALUES (?)`,
            [this.type],
            handleDBResponse
        )

    }

    updateById(handleDBResponse) {
        connection.query(
            `UPDATE contract SET 
            type = ?
            WHERE contract_id = ?`,
            [
                this.type,
                this.contract_id
            ],
            handleDBResponse
        )

    }


    static deleteById(contract_id, handleDBResponse) {
        connection.query(
            `DELETE FROM contract WHERE contract_id = ?`,
            [contract_id],
            handleDBResponse
        )
    }
}

export default Contract;




