import express from "express";
import * as title from "../controllers/title.controller.js";

const router = express.Router();

router.route("/").get(title.findAll).post(title.create);

router
    .route("/:title_id")
    .get(title.findOne)
    .put(title.update)
    .delete(title.remove);

export default router;
