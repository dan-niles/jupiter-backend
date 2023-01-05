import EmergencyContact from "../models/emergency_contact.model";

// insert new emergency contact into the database
export const create = (req, res) => {
    // validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create an emergency contact object
    const emergencyContact = new EmergencyContact({ ...req.body.data });

    // save emergency contact in the database
    emergencyContact.create((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the emergency contact"
            });
        } else res.send(data);
    });
}

// find a single emergency contact with a emegency_contact_id
export const findOne = (req, res) => {
    EmergencyContact.findById(req.params.emergency_contact_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No emergency contact found with emergency_contact_id ${req.params.emergency_contact_id}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving emergency contact with emergency_contact_id " + req.params.emergency_contact_id
                });
            }
        } else res.send(data);
    });
}

// retrieve all emergency contacts from the database
export const findAll = (req, res) => {
    EmergencyContact.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving emergency contacts"
            });
        else res.send(data);
    });
}

// update an emergency contact identified by the emergency_contact_id in the request
export const update = (req, res) => {
    // validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    EmergencyContact.updateById(
        req.params.emergency_contact_id,
        new EmergencyContact(req.body.data),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No emergency contact found with emergency_contact_id ${req.params.emergency_contact_id}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating emergency contact with emergency_contact_id " + req.params.emergency_contact_id
                    });
                }
            } else res.send(data);
        }
    );
}

// delete an emergency contact with the specified emergency_contact_id in the request
export const remove = (req, res) => {
    EmergencyContact.remove(req.params.emergency_contact_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No emergency contact found with emergency_contact_id ${req.params.emergency_contact_id}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete emergency contact with emergency_contact_id " + req.params.emergency_contact_id
                });
            }
        } else res.send({ message: `Emergency contact was deleted successfully!` });
    });
}

