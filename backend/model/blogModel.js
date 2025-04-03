const mongoose  = require("mongoose");

const blogModel = new mongoose.Schema({
    name:{type:String, required:true},
    desc:{type:String, required:true},
    author:{type:String, required:true},
})

const Blog = mongoose.model("blog", blogModel)

module.exports = {Blog}