const express = require("express")
const { createfolder, getfolders, addnotesInfolder, deletenotesfromfolder, deletefolder, getfolderNotelist } = require("../controllers/folder")
const { authenticator } = require("../middlewares/authenticator")

const folderRouter = express.Router()

folderRouter.post("/createfolder/:id",authenticator,createfolder)
folderRouter.get("/getfolders/:id",authenticator,getfolders)
folderRouter.put("/addnotesInfolder",authenticator,addnotesInfolder)
folderRouter.put("/deletenotesfromfolder",authenticator,deletenotesfromfolder)
folderRouter.delete("/deletefolder/:id",authenticator,deletefolder)
folderRouter.get("/getfolderNotelist",authenticator,getfolderNotelist)


module.exports = folderRouter