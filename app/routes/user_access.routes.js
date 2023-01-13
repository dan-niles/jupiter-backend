import express from "express";
import * as user_access from "../controllers/user_access.controller.js";

const router = express.Router();

router.route("/auth").post(user_access.findRecord);

export default router;
