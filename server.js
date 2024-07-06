const express=require("express");
const errorhandler = require("./middleware/errorHandler");
const connectdb  = require("./config/dbconnection");
const dotenv=require("dotenv").config();
const app=express()

connectdb();
const port=process.env.port || 8080;


app.use(express.json())  //provide parser(to recieve data from client)
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));
app.use(errorhandler);
console.log();
app.listen(port,()=>{
    console.log("Hello");
})