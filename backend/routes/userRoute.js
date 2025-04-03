const express = require("express");
const { User } = require("../model/userSchema");
const { register, login } = require("../controller/userController");
const router = express.Router();

router.post('/register',register );
router.post('/login', login);

module.exports = router