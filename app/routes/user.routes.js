import express from "express"
import * as user from "../controllers/user.controller.js"


const router = express.Router()

// Create a new user
router
    .get("/", user.findAll)
    .post("/", user.create)

// Retrieve a single user with id
router
    .get("/:user_id", user.findOne)
    .put("/:user_id", user.update)
    .delete("/:user_id", user.remove)

export default router
