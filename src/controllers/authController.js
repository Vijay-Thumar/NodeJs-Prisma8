import { prisma } from "../config/db.js"

const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user is already registered
    const userExists = await prisma.orm.public.User.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res.status(400).json({ error: "User already exists with the email id" })
    }



    res.json(body)
}


export { register }