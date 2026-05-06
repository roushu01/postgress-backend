const express=require("express")
const loginUser=require("../controllers/loginUser")
const Router=express.Router()

Router.post("/login",loginUser);
module.exports=Router