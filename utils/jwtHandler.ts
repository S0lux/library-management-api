const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const jwtConfig = {
    expiresIn: "3 days"
}

export function generateToken(username: String) {
    const token = jwt.sign({ username: username }, JWT_SECRET, jwtConfig)
    return token
}

export function verifyToken(token?: String) {
    if (token) {
        const payload = jwt.verify(token, JWT_SECRET)
        return payload
    }
    throw new Error
}