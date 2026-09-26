import express from "express"
import {
    addToWatchList,
    removeFromWatchlist,
    updateWatchListItem
} from "../controllers/watchlistController.js"
import { authmiddleware } from "../middleware/authMiddleware.js"
import { validateRequest } from "../middleware/validateRequest.js"
import { addWatchListSchema } from "../validators/watchListValidators.js"
const route = express.Router()

route.use(authmiddleware)

route.post("/", validateRequest(addWatchListSchema), addToWatchList)

route.put("/:id", updateWatchListItem)

route.delete("/:id", removeFromWatchlist)

export default route
