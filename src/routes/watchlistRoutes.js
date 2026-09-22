import express from "express"
import { addToWatchList } from "../controllers/watchlistController.js"
const route = express.Router()

route.post("/", addToWatchList)
// route.post("/login", login)
// route.post("/logout", logout)

export default route
