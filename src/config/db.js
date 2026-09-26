import postgres from "@prisma/orm-postgres/runtime"
import contractJson from "../prisma/contract.json" with { type: "json" }
import "dotenv/config" // <-- Add this right at the top

const prisma = postgres({
    contractJson,
    url: process.env.DATABASE_URL
})

const connectDB = async () => {
    try {
        // This will throw if the URL or credentials are bad
        await prisma.connect()
        // Execute a simple query to ensure the connection is fully established and working.
        // .first() returns null if the table is empty, so it works perfectly without any data.
        await prisma.orm.public.User.first()
        console.log("DB connected via prisma and query successful!")

    } catch (error) {
        console.log("There was database connection error", error.message)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.close()
}

export { prisma, connectDB, disconnectDB }
