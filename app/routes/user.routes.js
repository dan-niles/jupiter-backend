import express from "express";
import * as user from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(user.findAll).post(user.create);

router
	.route("/:user_id")
	.get(user.findOne)
	.put(user.update)
	.delete(user.remove);

router.route("/change-password/:user_id").put(user.changePassword);

router.route("/count").post(user.getCount);

export default router;
