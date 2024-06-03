const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const Note = require('../models/noteModel')


const asyncHandler = require("express-async-handler")

const requireAuth =asyncHandler(async(req, res, next)=>{
  try{
  const token = req.cookies.Authorization;
  if(!token){
    res.status(401)
    throw new Error("Not Authorized, Please login bitch")
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  if(Date.now() > decoded.exp){
    res.status(401)
    throw new Error("session expired, please login")
  }
  const user = await User.findById(decoded.sub)
  if(!user){
    res.status(401)
    throw new Error("Not authorized")
  }
  req.user = user;
  next()
  }catch(error){
    res.status(401)
    throw new Error("Not authorized, please login")
  }
})
module.exports = requireAuth
