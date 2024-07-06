//we use this for handle error and everything as a json format

const errorhandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    res.json({message:err.message,stackTrace:err.stack})
};


module.exports=errorhandler;