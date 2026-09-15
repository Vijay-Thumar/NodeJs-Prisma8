import express from 'express'
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/db.js'
import movieRoute from './routes/movieRoutes.js'
import authRoute from './routes/authRoutes.js'

config()
connectDB()

const app = express()

app.use("/movies", movieRoute)
app.use('/auth', authRoute)

app.get("/hello", (req, res, next) => {
    console.log('Hello from /hello api')
    res.json({
        message: "Hello from /hello api"
    })
})

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})

process.on("unhandledRejection", (error) => {
    console.error('unhandledRejection occurred : ', error)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on("uncaughtException", (err) => {
    console.error('uncaughtException occurred : ', err)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on("SIGTERM", (error) => {
    console.error('unhandledRejection occurred : ', error)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})