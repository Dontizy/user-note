const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
  title:{
    type:String,
    required:[true, "title can't be empty!!!"]
  },
  content:{
    type:String,
    required:[true,"content can't be empty!!!"]
  },
  user:{
    type:mongoose.Schema.Types.ObjectId, ref:"User"
     }
  
},{
  timestamps:true
  })
const Note = mongoose.model("Note", noteSchema)
module.exports = Note;