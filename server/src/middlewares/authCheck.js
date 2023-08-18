const { verfiyToken, getRollFromToken } = require('../utils/jwt')

module.exports.protect_with_auth = (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized" })
    }
    try {
        const decoded = verfiyToken(token)
        if (decoded) {
            next()
        }
    } catch (error) {
        return res.status(401).json(error.message)
    }
}

module.exports.check_auth_admin = (req, res, next) => {
    const token = req.cookies.jwt
    const roll = getRollFromToken(token)
    if (roll === "admin") {
        next()
    } else {
        return res.status(401).json({ errors: "Unauthorized" })
    }
}

module.exports.check_authed = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decoded = verfiyToken(token)
            if (decoded) {
                return res.status(400).json({ message: "You are already authenticated" })
            } else {
                next()
            }
        } catch (error) {
            next()
        }
    } else {
        next()
    }
}