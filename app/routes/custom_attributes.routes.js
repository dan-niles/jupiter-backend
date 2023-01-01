import express from "express";
import * as custom_attr from "../controllers/custom_attributes.controller.js";

const router = express.Router();

router.route("/").get(custom_attr.findAll).post(custom_attr.create);

router
	.route("/:user_id")
	.get(custom_attr.findOne)
	.put(custom_attr.update)
	.delete(custom_attr.remove);

export default router;
