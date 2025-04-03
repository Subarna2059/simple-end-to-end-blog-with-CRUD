const { User } = require("../model/userSchema");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const secret = process.env.JWTSECRET

 const register = async (req, res)=>
    {
        const {name,password} = req.body;
        try {
            const encryptedPassword = await bcrypt.hash(password,10)
            if (encryptedPassword){
                const insertData = await new User({name:name,password:encryptedPassword})
                const data = await insertData.save()
                res.status(200).json({
                    message:"User created successfullt",
                    user:data
                })
            } else {
                res.status(500).json({
                    message:"something went wrong"
                })
            }
        } catch (e) {
            res.status(500).json({
                message:e.message
            })
        }
    }
 const login = async(req, res)=>
    {
        const {name,password} = req.body;
        try{
            const findUser = await User.findOne({name:name})
            if (findUser) {
                const dcryptPassword = await bcrypt.compare(password,findUser.password)
                if(dcryptPassword) {
                    const token =  await jwt.sign({name:findUser.name},secret)
                    res.status(200).json({
                        token:token
                    })
                } else {
                    res.status(401).json({
                        essage:"invalid password"
                    })
                }
            }
        } catch (e) {
            res.status(400).json({
                message:e.message
            })
        }
    }

    module.exports={register,login}