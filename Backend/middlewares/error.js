//Error handling middleware
const ErrorHandler= require('../utils/errorHandler')

const error=(err, ctx)=>{
    console.log(err)

    if(err.code === 11000){
        const message= `Duplicate Keys Entered`
        err = new ErrorHandler(400, message);
    }

    ctx.status= err.status || 500
    ctx.body={
        success: false,
        message: err.message || "Internal Server Error",
    }
}

module.exports = error