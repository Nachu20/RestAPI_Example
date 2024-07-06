//@desc register users
//@route post /api/users
//@access public
const  bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const usermodel=require("../models/usermodel");
const asyncHandler=require("express-async-handler");

//registration of user 
const registerUser= asyncHandler(async(req,res)=>{
    const {username,email,password}= req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await usermodel.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,5);
    const user=await usermodel.create({
        username,
        email,
        password:hashedPassword,
    })
    if(user)
        res.status(201).json({_id:user.id,email:user.email});
    else{
        res.status(400);
        throw new Error("user data is not valid");
    }
})
//login process
const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await usermodel.findOne({email});
    //compare password with hashedpassword
    if(user &&(await bcrypt.compare(password,user.password)))
  {
    const accesstoken=jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        }
    },process.env.ACCESS_TOKEN_SECERT,
    {expiresIn:"10m"})
    res.status(200).json({ accesstoken })
  }
  else{
    res.status(400);
    throw new Error("Password is not valid")
  }  
    
})

const currentUser= asyncHandler(async(req,res)=>{
    res.json({message:"Current user"})
})

module.exports={registerUser,loginUser,currentUser}