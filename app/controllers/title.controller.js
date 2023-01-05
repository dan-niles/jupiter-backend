import Title from '../models/title.model';

// insert new title into the database
export const create = (req, res) => {
    // validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create a title object
    const title = new Title({ ...req.body.data });

    // save title in the database
    title.create((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the title"
            });
        } else res.send(data);
    });
}

// find a single title with a title_id
export const findOne = (req, res) => {
    Title.findById(req.params.title_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No title found with title_id ${req.params.title_id}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving title with title_id " + req.params.title_id
                });
            }
        } else res.send(data);
    });
}

// retrieve all titles from the database
export const findAll = (req, res) => {
    Title.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving titles"
            });
        else res.send(data);
    });
}

// update a title identified by the title_id in the request
export const update = (req, res) => {
    // validate request
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Title.updateById(
        req.params.title_id,
        new Title(req.body.data),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No title found with title_id ${req.params.title_id}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating title with title_id " + req.params.title_id
                    });
                }
            } else res.send(data);
        }
    );
}

// delete a title with the specified title_id in the request
export const remove = (req, res) => {
    Title.remove(req.params.title_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No title found with title_id ${req.params.title_id}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete title with title_id " + req.params.title_id
                });
            }
        } else res.send({ message: `Title was deleted successfully!` });
    });
}

