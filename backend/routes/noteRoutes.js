const express = require('express')
const router = express.Router()
const requireAuth = require("../middleWares/requireAuth")

const {getSingleNote,
  getNotes,
  deleteNote,
  createNote,
  updateNote}= require('../controllers/noteController')


router.get("/",requireAuth, getNotes).get("/:id", requireAuth, getSingleNote)
router.post("/",requireAuth, createNote)
router.put("/:id",requireAuth, updateNote)
router.delete("/:id",requireAuth,deleteNote)

module.exports = router