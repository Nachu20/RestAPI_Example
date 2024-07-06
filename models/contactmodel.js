const mongoose=require("mongoose");

const conschema= mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
    },
    name:{
        type:String,
        required:[true,"please add the contact name"],
    },
    phone:{
        type:String,
        required:[true,"please add the contact no"],
    }
});

module.exports=mongoose.model("Contacts",conschema);