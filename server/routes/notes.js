const express = require("express")
const {  getNotes, updateNotes, addNotes, deletenotes } = require("../controllers/notes")
const { authenticator } = require("../middlewares/authenticator")

const NotesRouter = express.Router()

NotesRouter.post("/addnotes/:id",authenticator,addNotes)
NotesRouter.get("/getnotes/:id",authenticator,getNotes)
NotesRouter.put("/updatenotes/:id",authenticator,updateNotes)
NotesRouter.delete("/deletenotes",authenticator,deletenotes)

module.exports = NotesRouter