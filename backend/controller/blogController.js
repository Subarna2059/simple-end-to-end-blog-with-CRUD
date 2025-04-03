const { Blog } = require("../model/blogModel");

const createBlog = async(req,res)=>
{
    const {name,desc} = req.body;
    const userName = req.user.name;
    try{
        const blog = await new Blog({name:name,desc:desc,author:userName})
        const savedBlog = await blog.save()
        res.json({
            Blog:savedBlog
        })
    } catch (e) {
        console.log(e.message)
    }
}

const getBlog = async(req,res)=>
{
    try{
        const blogs = await Blog.find();
        if (blogs) {
            res.json({
                blogs:blogs
            })
        } else {
            res.status(404).json({
                message:"No record found"
            })
        }
    } catch(e) {
        return e.message
    }
}
const getBlogById = async(req,res)=>
{
    const {id} = req.params;
    try{
        const blogById = await Blog.findById(id);
        res.json({
            blogById: blogById
        })
    } catch (e) {
        console.log(e.message)
    }
}
const updateBlog = async(req,res)=>
{
    const {name,desc} = req.body
    const {id} = req.params
    try{
        const updateData = await Blog.findByIdAndUpdate({_id:id},{name ,desc}, {new:true})
        res.json({
            data:updateData
        })
    }catch(e) {
        return e.message
    }    console.log("hello");
}
const deleteBlog = async(req,res)=>
{
    const {id}= req.params
    try {
        const find = await Blog.findByIdAndDelete(id)
        res.json({
            deletedData : find
        })
    } catch (e) {
        res.json({
            error:e.message
        })
    }
    
}
module.exports = {createBlog,getBlog,getBlogById,updateBlog,deleteBlog}