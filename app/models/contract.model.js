import connection from "../config/db.js";


class Contract {

    constructor(contract_id, type) {
        this.contract_id = contract_id;
        this.type = type;
    }

    create(result) {
        connection.query(
            `INSERT INTO contract(type)
            VALUES (?)`,
            [this.type],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                this.contract_id = res.insertId;
                result(null, {...this});
            }
        )

    }


    static getAll(result) {
        connection.query(
            `SELECT * FROM contract`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }

                return result(null, res)
            }
        )
    }


    static getById(contract_id, result) {
        connection.query(
            `SELECT * FROM contract WHERE contract_id = ${contract_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null)
                }
                return result(null, res)
            }
        )   
    }
    
    updateById(result) {
        connection.query(
            `UPDATE contract SET 
            type = ?
            WHERE contract_id = ?`,
            [
                this.type,
                this.contract_id
            ],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                }
                return result(null, res)
            }
        )
        
    }


deleteById(result) {
        connection.query(
            `DELETE FROM contract WHERE contract_id = ${this.contract_id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err)
                    return result(err, null)
                }
                return result(null, res)
            }
        )
    }
}

export default Contract;




