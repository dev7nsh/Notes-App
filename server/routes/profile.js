const express = require("express")
const { getprofile, deleteaccount, updateprofile } = require("../controllers/profile")
const { authenticator } = require("../middlewares/authenticator")
const profileRouter = express.Router()

profileRouter.get("/getprofile/:id",authenticator,getprofile)
profileRouter.delete("/deleteprofile/:id",authenticator,deleteaccount)
profileRouter.put("/updateprofile/:id",authenticator,updateprofile)



module.exports = profileRouter