import express from "express";
import * as dependant from "../controllers/dependant.controller.js";

const router = express.Router();

router.route("/:emp_id").get(dependant.findByEmpID);

export default router;
