import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"

const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user is already registered
    const userExists = await prisma.orm.public.User.where({
        email: email
    }).first()

    if (userExists) {
        return res.status(400).json({ error: "User already exists with the email id" })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await prisma.orm.public.User.create({
        name,
        email,
        password: hashedPassword
    })


    res.status(201).json({
        status: 'sucess', data: {
            user: { id: user.id, name, email }
        }
    })
}


export { register }