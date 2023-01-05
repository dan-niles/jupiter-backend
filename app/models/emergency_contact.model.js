import connection from "../config/db";

class Emergencycontact {
    constructor ({
        emegency_contact_id,
        emp_id,
        contact_name,
        phone_no,
        address,
        relationship_to_emp,

    })
        {
            this.emegency_contact_id = emegency_contact_id ;
            this.emp_id = emp_id ;
            this.contact_name = contact_name ;
            this.phone_no = phone_no ;
            this.address = address ;
            this.relationship_to_emp = relationship_to_emp ;
        }

        static getAll(result) {
            connection.query(`SELECT * FROM emergency_contact`, result);
        }

        static getById(emegency_contact_id, result) {
            connection.query(
                `SELECT * FROM emergency_contact WHERE emegency_contact_id = ?`,
                [emegency_contact_id],
                result
            )
        }

        static getByEmp(emp_id, result) {
            connection.query(
                `SELECT * FROM emergency_contact WHERE emp_id = ?`,
                [emp_id],
                result
            )
        }

        create(result) {
            connection.query(
                `INSERT INTO emergency_contact
                (
                    emegency_contact_id,
                    emp_id,
                    contact_name,
                    phone_no,
                    address,
                    relationship_to_emp,
                )
                VALUES
                (?,?,?,?,?,? )`,
                [
                    this.emegency_contact_id,
                    this.emp_id,
                    this.contact_name,
                    this.phone_no,
                    this.address,
                    this.relationship_to_emp,
                ],
                result
            )
        }

        update(result) {
            connection.query(
                `UPDATE emergency_contact SET
                    emp_id = ?,
                    contact_name = ?,
                    phone_no = ?,
                    address = ?,
                    relationship_to_emp = ?,
                WHERE emegency_contact_id = ?`,
                [
                    this.emp_id,
                    this.contact_name,
                    this.phone_no,
                    this.address,
                    this.relationship_to_emp,
                    this.emegency_contact_id
                ],
                result
            )
        }

        delete(result) {
            connection.query(
                `DELETE FROM emergency_contact WHERE emegency_contact_id = ?`,
                [this.emegency_contact_id],
                result
            )
        }

        static deleteById(emegency_contact_id, result) {
            connection.query(
                `DELETE FROM emergency_contact WHERE emegency_contact_id = ?`,
                [emegency_contact_id],
                result
            )
        }

        static deleteByEmp(emp_id, result) {
            connection.query(
                `DELETE FROM emergency_contact WHERE emp_id = ?`,
                [emp_id],
                result
            )
        }

}

export default EmergencyContact;