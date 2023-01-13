import express from "express";
import * as emergency_contact from "../controllers/emergency_contact.controller.js";

const router = express.Router();

router.route("/:emp_id").get(emergency_contact.findByEmpID);

export default router;
