import express from "express";
import * as status from "../controllers/status.controller.js";

const router = express.Router();

router.route("/").get(status.findAll).post(status.create);

router
	.route("/:status_id")
	.get(status.findOne)
	.put(status.update)
	.delete(status.remove);

export default router;
