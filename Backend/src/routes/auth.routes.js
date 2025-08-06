const express=require("express");
const router=express.Router();
const { registerController,loginController, getUserDetails } = require("../Controllers/auth.controllers");
const { jwtVerify } = require("../middleware/jwtVerify");


router.post("/register",registerController);
router.post("/login",loginController);
router.get("/user",jwtVerify,getUserDetails);

module.exports=router;