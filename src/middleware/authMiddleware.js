import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js"

// read the token from the request
// validate that token if that is valid or not

const authmiddleware = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return res.status(401).json({ error: "unauthorized access!" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.orm.public.User.where({
            id: decoded.id
        }).first()

        if (!user) {
            return res.status(401).json({ error: "unauthorized access! user is not available!" })
        }
        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ error: "Not authorized, no token provided!" })
    }
}

export { authmiddleware }
