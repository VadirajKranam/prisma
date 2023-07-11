const prisma = require("../prisma/index");
const jwt = require('jsonwebtoken')
exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token)
        {
            res.send('Please login')
            //throw new Error('You are not logged in');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where: {
            id:decodedToken.userId
            }
        })
        next()
    }
    catch (error) {
    throw new Error(error)
    }
}