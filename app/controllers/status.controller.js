import Status from "../models/status.model.js";

// Insert new status level into the database
export const create = (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a status object
    const status = new Status({ ...req.body.data });

    // Save status in the database
    status.create((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the status",
            });
        } else res.send(data);
    });
};

// Find a single attribute with a status_id
export const findOne = (req, res) => {
    Status.findById(req.params.status_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No status found with status_id ${req.params.status_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving status with status_id " + req.params.status_id,
                });
            }
        } else res.send(data);
    });
};

// Retrieve all custom statuses from the database
export const findAll = (req, res) => {
    Status.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving statuses",
            });
        else res.send(data);
    });
};

// Update a status identified by the status_id in the request
export const update = (req, res) => {
    // Validate Request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const status = new Status(req.body.data);

    status.status_id = req.params.status_id;

    status.updateById((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No status level found with status_id ${req.params.status_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error updating status level with status_id " +
                        req.params.status_id,
                });
            }
        } else res.send(data);
    });
};

// Delete a status with the specified status_id in the request
export const remove = (req, res) => {
    Status.remove(req.params.status_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No status found with status_id ${req.params.status_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete status with status_id " + req.params.status_id,
                });
            }
        } else res.send({ message: `Status level was deleted successfully!` });
    });
};
