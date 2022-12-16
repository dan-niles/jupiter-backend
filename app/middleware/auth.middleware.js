import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const authorization = {
	"admin": [
		"/user"
	],
	"hr-user": [
		"/user"
	],
	"user": [
	]
}

dotenv.config()

const validateToken = (req, res, next) => {

	const token = req.get("authorization")?.slice("Bearer ".length)

	if (!token) {
		return res.status(403).send("A token is required for authentication")
	}

	try {

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		req.user = decoded

		const access_routes = authorization[decoded.role]


		for (const url of access_routes) {
			if (req.url.startsWith(url)) {
				return next()
			}
		}

		return res.status(403).send("Access denied.!")
	} catch (err) {

		console.log(err);
		return res.status(401).send("Invalid Token")
	}
}

export default validateToken
