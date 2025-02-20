const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");


const validateToken=asyncHandler (async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];//1st index
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
          req.user=decoded.user;  //extracted the information from the token
          next();//intercept the request and append on the request
        })
        if(!token)
    res.status(401);
    }
})


module.exports=validateToken;