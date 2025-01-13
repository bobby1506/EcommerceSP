const jwt = require('jsonwebtoken')
const error = require('../middlewares/error')

const generateToken= (user)=>{
    const token= jwt.sign(
        {userId:user._id, userName: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
    return token
}

//verify
const verifyToken= async (ctx, next)=>{
    try{
        const token = ctx.headers.authorization?.split(" ")[1]

        if(!token){
            throw new error(401, "Access denied. No token provided")
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        ctx.user = verifiedToken
        await next();
    }
    catch(err){
        throw new error(401, "Invalid or expired token")
    }
}

module.exports= {generateToken, verifyToken}