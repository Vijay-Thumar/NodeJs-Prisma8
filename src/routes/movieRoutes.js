import express from 'express'
const route = express.Router()


route.get("/hello", (req, res) => {
    res.json({
        message: "Hello from movie get api"
    })
})

route.post("/hello", (req, res) => {
    res.json({
        message: "Hello from movie post api"
    })
})

route.put("/hello", (req, res) => {
    res.json({
        message: "Hello from movie put api"
    })
})

route.delete("/hello", (req, res) => {
    res.json({
        message: "Hello from movie delete api"
    })
})

export default route