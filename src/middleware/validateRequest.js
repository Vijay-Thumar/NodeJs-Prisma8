export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            const errorMessages = JSON.parse(result.error.message).map((err) => err.message)
            const error = errorMessages.join(", ")
            return res.status(400).json({ message: error })
        }
        next()
    }
}
