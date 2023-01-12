import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = (req, res, next) => {

	const token = req.headers["access-token"] ||
		req.headers["authorization"]?.slice("Bearer ".length)

	if (!token) {
		return res.status(403).send(
			{
				error: "Auth token is not provided.!"
			}
		);
	}

	try {

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;

	} catch (err) {

		console.log(err)
		return res.status(401).send("Invalid Token");

	}

	return next();
};

export default validateToken;
