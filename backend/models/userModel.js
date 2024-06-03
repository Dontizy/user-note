const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
  email:{
    type:String,
    index:true,
    unique: true,
    required:[true, "name can't be empty"],
    lowercase:true
  },
  password:{
    type:String,
    required:[true, "password can't be empty"]
  },
  notes:[{
    type:mongoose.Schema.Types.ObjectId, 
      ref:"Note",
      required:[true, 'blog id is required']
  }],
},{
  timestamps:true
  })
  userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    
  })
  const User = mongoose.model("User", userSchema)
  module.exports = User