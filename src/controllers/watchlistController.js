import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body

    // verify movie in table
    console.log("gone from here")
    const movie = await prisma.orm.public.Movie.where({
        id: movieId
    }).first()
    console.log("gone from here1")

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" })
    }

    // check movie if alread added
    console.log("gone from here2")

    const existingInWatchList = await prisma.orm.public.WatchlistItem
        .where({ userId, movieId })
        .first()
    console.log("gone from here3")

    if (existingInWatchList) {
        return res.status(400).json({ error: "Movie already added to watchlist" })
    }

    const watchListItem = await prisma.orm.public.WatchlistItem.create({
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes
    })

    res.status(201).json({
        status: "Sucess",
        data: {
            watchListItem
        }
    })
}

export { addToWatchList }
