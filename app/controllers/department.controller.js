import Department from "../models/department.model.js";

// Insert new department into the database
export const create = (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a department object
    const department = new Department({ ...req.body.data });

    // Save department in the database
    department.create((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the department",
            });
        } else res.send(data);
    });
};

// Find a single department with a dept_id
export const findOne = (req, res) => {
    Department.findById(req.params.dept_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No department found with dept_id ${req.params.dept_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving department with dept_id " + req.params.dept_id,
                });
            }
        } else res.send(data);
    });
};

// Retrieve all custom attributes from the database
export const findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving attributes",
            });
        else res.send(data);
    });
};

// Update a department identified by the dept_id in the request
export const update = (req, res) => {
    // Validate Request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const department = new Department(req.body.data);

    department.dept_id = req.params.dept_id;

    department.update((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No department found with dept_id ${req.params.dept_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error updating department with dept_id " + req.params.dept_id,
                });
            }
        } else res.send(data);
    });
};

// Delete a department with the specified dept_id in the request
export const remove = (req, res) => {
    Department.delete(req.params.dept_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No department found with dept_id ${req.params.dept_id}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete department with dept_id " + req.params.dept_id,
                });
            }
        } else res.send({ message: `Department was deleted successfully!` });
    });
};
