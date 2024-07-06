//@desc get all contacts
//@route get /api/contacts
//@access private
//async handler is used to handle the error caused by mongodb

const Contact=require("../models/contactmodel")
const asyncHandler=require("express-async-handler");

const getCont=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id});
    if(!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(contacts);
});

const creCont=asyncHandler(async(req,res)=>{
    const {name,phone}=req.body;
    if(!phone||!name)
    throw new Error("All fields are mandatory")
    const contact=await Contact.create({
          name,
          phone,
          user_id:req.user.id
     });
    res.status(201).json(contact);
});

const updCont=asyncHandler(async(req,res)=>{
    const contacts=await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update the other user contacts ") 
    }
    const update=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(update)
})
 
const delCont=asyncHandler(async(req,res)=>{
    const contacts=await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contacts.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to delete  other user contacts ") 
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(203).json(contacts)});


module.exports={getCont,creCont,updCont,delCont};