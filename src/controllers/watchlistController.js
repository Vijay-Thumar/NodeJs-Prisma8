import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body

    // verify movie in table
    const movie = await prisma.orm.public.Movie.where({
        id: movieId
    }).first()

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" })
    }

    // check movie if alread added

    const existingInWatchList = await prisma.orm.public.WatchlistItem.where({
        userId: req.user.id,
        movieId
    }).first()

    if (existingInWatchList) {
        return res.status(400).json({ error: "Movie already added to watchlist" })
    }

    const watchListItem = await prisma.orm.public.WatchlistItem.create({
        userId: req.user.id,
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

const removeFromWatchlist = async (req, res) => {
    const movieId = req.params.id

    if (!movieId) {
        return res.status(400).json({ error: "Movie id is required" })
    }

    // verify movie if added in the watchlist
    const movie = await prisma.orm.public.WatchlistItem.where({
        userId: req.user.id,
        movieId
    }).first()

    if (!movie) {
        return res.status(404).json({ error: "Movie not found in watchlist" })
    }

    if (movie.userId != req.user.id) {
        return res
            .status(403)
            .json({ error: "Unauthorized access, Not allowed to update watchlist!" })
    }

    await prisma.orm.public.WatchlistItem.where({
        id: movie.id
    }).delete()

    res.status(200).json({ status: "success" })
}

const updateWatchListItem = async (req, res) => {
    const id = req.params.id
    const { status, rating, notes } = req.body

    if (!id) {
        return res.status(400).json({ error: "Watchlist item id is required" })
    }

    const existingWatchListItem = await prisma.orm.public.WatchlistItem.where({
        id
    }).first()

    if (!existingWatchListItem) {
        return res.status(404).json({ error: "Watchlist item not found" })
    }

    if (existingWatchListItem.userId != req.user.id) {
        return res
            .status(403)
            .json({ error: "Unauthorized access, Not allowed to update watchlist item!" })
    }

    const updatedWatchListItem = await prisma.orm.public.WatchlistItem.where({
        id
    }).update({
        status: status.toUpperCase(),
        rating: rating,
        notes: notes
    })

    res.status(200).json({
        status: "success",
        data: {
            updatedWatchListItem
        }
    })
}

export { addToWatchList, removeFromWatchlist, updateWatchListItem }
