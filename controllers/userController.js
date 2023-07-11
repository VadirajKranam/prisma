//bring in prisma
const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')

//user signup
exports.signup = async(req,res,next) => {
    try {
      const { name, email, password } = req.body;
      //check
      if (!name || !email || !password) {
        throw new Error("Please provide all fields");
      }
      // create a new user same statement for every database in use
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password:password,
        }
      });
        //send user a token
        cookieToken(user,res)
    }
    catch (e) {
    throw new Error(e)
    }
}
exports.loginUser = async (req, res, next) => {
    try {
        const {  email, password } = req.body
        if (!email || !password)
        {
          throw new Error("Please provide all fields");
        }
        const user = await prisma.user.findUnique({
            where: {
            email:email
            }
        })
        if (!user)
        {
         throw new Error("No user found");
        }
        if (user.password!=password) {
          throw new Error("Password is incorrect");
        }
        cookieToken(user,res)
    }
    catch (error) {
    throw new Error(error)
    }
}
exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).json({success:true})
    }
    catch (error) {
    throw new Error("Something went")
    }
}