const express = require("express");
const { dbConnect } = require("./config/dbconnect");
const blogRoute = require("./routes/blogRoute")
const userRoute = require("./routes/userRoute")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express();
app.use(express.json());
const port = 8080;
dbConnect()
app.use(cors({
    origin:"http://localhost:5173",
}));


app.use("/api/v1/blog",blogRoute)
app.use("/api/v1/user", userRoute)

app.listen(port,()=>{
    console.log("server is up");
})