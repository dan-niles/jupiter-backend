import express from "express";
import * as paygrade from "../controllers/paygrade.controller.js";

const router = express.Router();

router.route("/").get(paygrade.findAll).post(paygrade.create);

router
	.route("/:paygrade_id")
	.get(paygrade.findOne)
	.put(paygrade.update)
	.delete(paygrade.remove);

export default router;
