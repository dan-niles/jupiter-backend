import express from "express";
import * as branch from "../controllers/branch.controller.js";

const router = express.Router();

router.route("/").get(branch.findAll).post(branch.create);

router
	.route("/:branch_id")
	.get(branch.findOne)
	.put(branch.update)
	.delete(branch.remove);

export default router;
