import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

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

    // Generate JWT token
    const token = generateToken(user.id, res)

    res.status(201).json({
        status: "sucess",
        data: {
            user: { id: user.id, name, email },
            token
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    console.log("user details: ", email, password)

    // check if user exists in the table
    const userExists = await prisma.orm.public.User.where({ email: email }).first()
    if (!userExists) {
        return res.status(401).json({ error: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password)

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = generateToken(userExists.id, res)

    res.status(200).json({
        status: "success",
        data: {
            user: { id: userExists.id, email: userExists.email },
            token
        }
    })
}

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict"
    })
    return res.status(200).json({ message: "Logout successful" })
}

export { register, login, logout }
