import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Insert new user into the database
export const authenticate = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		})
	}

	const { username, password } = req.body
}


export default class LoginCtrl {


	static async loginUser(req, res) {

		const { username, password } = req.body

		if (!username || !password) {
			return res.status(400).send({
				error: "username or password not provided."
			})
		}

		// Retrieve user with same username from the database
		User.findByUsername(username, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Invalid credentials!`,
					})
				} else {
					res.status(500).send({
						message: "Error! Please try again later.",
					})
				}
			} else {
				// Compare password
				if (bcrypt.compareSync(password, data.password)) {
					const accessToken = jwt.sign(
						{
							username: username,
							user_id: data.user_id,
							emp_id: data.emp_id,
							role: data.role
						},
						process.env.JWT_SECRET_KEY
					)

					delete data["password"]

					data.token = accessToken
					return res.send(data)
				} else {
					res.status(404).send({
						message: `Invalid credentials!`,
					})
				}
			}
		})
	}
};
