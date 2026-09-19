import postgres from "@prisma/orm-postgres/runtime"
import contractJson from "../prisma/contract.json" with { type: "json" }
import "dotenv/config" // <-- Add this right at the top
const prisma = postgres({
    contractJson,
    url: process.env.DATABASE_URL
})

const insertTestUser = async () => {
    try {
        const newUser = await prisma.orm.public.User.create({
            email: "hello@example.com",
            id: 132123,
            name: "Prisma 8 Tester",
            updatedAt: new Date(),
            password: "qwe123dwwe"
        })

        console.log("Successfully created user:", newUser)
    } catch (error) {
        console.log("Error creating user:", error.message)
    }
}

// Method is created while testing and learning
const getFirstUser = async () => {
    // Replaces prisma.user.findFirst()
    const user = await prisma.orm.public.User.first()
    console.log("Found user:", user)
}

const connectDB = async () => {
    try {
        // This will throw if the URL or credentials are bad
        await prisma.connect()
        console.log("DB connected via prisma!")

        // Log the available methods on the User model to debug the API
        // const userMethods = Object.keys(prisma.orm?.public?.User || {});
        // console.log('Available User model methods:', userMethods);

        const user = await prisma.orm.public.User.first()
        if (!user) {
            await insertTestUser()
        } else {
            console.log("We have the first user: ", user)
        }
    } catch (error) {
        console.log("There was database connection error", error.message)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.close()
}

export { prisma, connectDB, disconnectDB }
