module.exports = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "subscriber") {
        return res.send("Access denied. Subscribers only.")
    }
    next()
}
