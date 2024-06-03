const asyncHandler = require('express-async-handler')
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const Note = require('../models/noteModel')

const getUsers = asyncHandler(async(req, res)=>{
  const user = await User.find().sort({createdAt:-1})
  res.status(200).json(user)
})

const getSingleUser=asyncHandler(async(req, res)=>{
  const {userId} = req.params
  const user = await User.findById({_id:req.user._id})
  //const count = await Note.find({user:req.user._id}).count()
  
  if(!user){
    res.status(404)
    throw new Error("user does not exist!")
  }
  const {email, notes} = user
  res.status(200).json({
    email,
    notes:notes.title
    //count
  })
})

const signUp = asyncHandler(async(req, res)=>{
  const {email, password} = req.body
  if(!email){
    res.status(400)
    throw new Error("email can't be empty")
  }
  if(!password){
    res.status(400)
    throw new Error("password can't be empty")
  }
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("User already exists, login!!")
  }
  const user = await User.create({
    email,
    password
  })
  res.status(200).json({
    email,
    token
  })
})

const loginUser= asyncHandler(async(req, res)=>{
  const {email, password} = req.body
  if(!email){
    res.status(400)
    throw new Error("email can't be empty!!")
  }
if(!password){
    res.status(400)
    throw new Error("password can't be empty!!")
  }
  
  const user = await User.findOne({email})
  if(!user){
    res.status(401)
    throw new Error("User does not exists, signup for an account!!")
  }
  const matchedPassword = await bcrypt.compare(password, user.password)
  if(!matchedPassword){
    res.status(401)
    throw new Error("Unauthorized Access!!, invalid password!!")
  }
  const exp = Date.now() + 1000 * 60 * 60 * 24;
  const token = jwt.sign({sub:user._id, exp}, process.env.SECRET)
  res.cookie("Authorization", token, {
    expires: new Date(exp),
    path:"/",
    httpOnly:true,
    sameSite:'lax',
    secure: process.env.NODE_ENV === "production",
    
  })
  res.sendStatus(200)
})

const logout=(req, res)=>{
  try{
  res.clearCookie("Authorization")
  res.sendStatus(200)
  }catch(err){
    res.status(400)
    console.log(err)
  }
}

const deleteUser = asyncHandler(async(req, res)=>{
  const {userId} = req.params
  const user = await User.findByIdAndDelete({_id:userId})
 res.status(200).json({"user":"user deleted"})
  
})

const checkAuth = asyncHandler(async(req, res)=>{
  res.sendStatus(200)
})

module.exports = {
  deleteUser,
  getSingleUser,
  getUsers,
  signUp,
  loginUser,
  checkAuth,
  logout
}