const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const errorHandler = require('./middleWares/errorHandlerMiddleware')
const noteRouter = require("./routes/noteRoutes")
const userRouter = require("./routes/userRoutes")
if(process.env.NODE_ENV !== "production"){
  dotenv.config();
}
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.get("/",(req, res)=>{
  res.send("<h1>welcome to notio</h1>")
})
app.use(cookieParser())
app.use("/notio/note", noteRouter)
app.use("/notio/user", userRouter)
app.use(errorHandler)

const start =async()=>{
  try{
    const con = mongoose.connect(DB_URL)
    mongoose.connection.on("connected", ()=>console.log("Mongodb connected"))
    app.listen(PORT, ()=>console.log(`server running @:=> ${PORT}`))
  }catch(err){
    console.log(err)
  }
}
start();