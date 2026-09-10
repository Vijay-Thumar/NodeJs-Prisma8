import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "../../prisma/schema.json" with { type: 'json' };

const prisma = postgres({
    contractJson,
    url: process.env.DATABASE_URL
})

const connectDB = async () => {
    try {
        // In Prisma 8, connection is lazy, but we can issue a test query to verify
        await prisma.sql`SELECT 1`;
        console.log('DB connected via prisma')
    } catch (error) {
        console.log('There was database connection error', error.message)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.close()
}

export { prisma, connectDB, disconnectDB }