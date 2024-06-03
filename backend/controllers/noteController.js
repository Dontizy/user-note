const asyncHandler = require('express-async-handler')
const mongoose=require('mongoose')
const Note = require('../models/noteModel')
const User = require("../models/userModel")


const getNotes =asyncHandler(async(req, res)=>{
  const note = await Note.find({user:req.user._id}).sort({createdAt:-1})
  res.status(200).json(note)
})

const getSingleNote =asyncHandler(async(req, res)=>{
  const {id} = req.params
 
  const note = await Note.findOne({_id:id, user:req.user._id})
  if(!note){
    res.status(404)
    throw new Error("Note does not exists")
  }
  const {title, content, user, _id} = note
  res.status(200).json({
    _id,
    title,
    content,
    user:req.user.email
  })
})

const createNote = asyncHandler(async(req, res)=>{
  const {title, content} = req.body
  const existingUser = await User.findById(req.user._id)
  if(!title){
    res.status(400)
    throw new Error("title can't be empty")
  }
  if(!content){
    res.status(400)
    throw new Error("content can't be empty")
  }
  if(!existingUser){
    res.status(400)
    throw new Error("user id can't be empty")
  }
  const session = await mongoose.startSession()
  session.startTransaction()
  const note = new Note({title, content, user:req.user._id})
   await note.save({session})
   existingUser.notes.push(note)
   await existingUser.save({session})
   await session.commitTransaction()
   await note.save()
  res.status(201).json(note)
})

const updateNote= asyncHandler(async(req, res)=>{
  const {title, content} = req.body
  const {id} = req.params

  const note = await Note.findOneAndUpdate({_id:id, user:req.user._id},{title,
     content},{
       new:true,
       runValidators:true
     }
       )
    if(!note){
      res.status(404)
      throw new Error("note does not exists")
    }
    res.status(200).json(note)
})

const deleteNote = asyncHandler(async(req, res)=>{
  const {id} = req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400)
    throw new Error(`incorrect id:${id}, stop injecting id`)
  }
  
  const note = await Note.deleteOne({_id:id, user:req.user._id})
  if(!note){
    throw new Error("note does not exists")
  }
  res.status(200).json({"delete":"successfully"})
})

module.exports ={
  getSingleNote,
  getNotes,
  deleteNote,
  createNote,
  updateNote
}