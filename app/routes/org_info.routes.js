import express from "express";
import * as org_info from "../controllers/org_info.controller.js";

const router = express.Router();

router.route("/").get(org_info.findAll);

router.route("/:id").get(org_info.findOne).put(org_info.update);

export default router;
