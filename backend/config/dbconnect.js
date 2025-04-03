const mongoose = require("mongoose")
require("dotenv").config();
const uri = process.env.CONNECTIONSTRING
const dbConnect = async()=>
{
    try{
        await mongoose.connect(uri)
        console.log("connection successful");
    } catch(e) {
        console.log(
         e.message
        );
    }
}

module.exports = {dbConnect}