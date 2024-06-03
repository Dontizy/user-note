const express = require("express")
const router = express.Router()
const {deleteUser,getSingleUser, getUsers, signUp, loginUser, checkAuth, logout
} = require("../controllers/userController")
const requireAuth = require('../middleWares/requireAuth')


router.get("/",  getUsers).get("/user",requireAuth, getSingleUser)
router.post("/signup", signUp)
router.delete("/:userId", deleteUser)
router.post("/login", loginUser)
router.get("/logout/user", requireAuth, logout)
router.get("/check-auth/user", requireAuth, checkAuth)

module.exports = router