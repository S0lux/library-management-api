const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const jose = require("jose")
const alg = 'HS256'

export async function generateToken(username: String) {
    const token = await new jose.SignJWT({ username: username })
                                .setProtectedHeader({ alg })
                                .setIssuedAt()
                                .setExpirationTime('3d')
                                .sign(JWT_SECRET)
    return token
}

export async function verifyToken(token?: String) {
    if (token) {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET)
        return payload
    }
    throw new Error
}