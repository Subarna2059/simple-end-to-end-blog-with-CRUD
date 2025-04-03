const express = require("express");
const router = express.Router();
const {createBlog,getBlog,getBlogById,updateBlog,deleteBlog} = require("../controller/blogController");
const { authMiddleWare } = require("../middleware/authUserMiddleware");
router.post("/",authMiddleWare, createBlog)
router.get("/", authMiddleWare, getBlog)
router.get("/:id",authMiddleWare, getBlogById)
router.put("/:id", authMiddleWare, updateBlog)
router.delete("/:id", authMiddleWare, deleteBlog)

module.exports = router