const express = require("express")
const { SignUp, SignIn } = require("../controllers/auth")

const AuthRouter = express.Router()

AuthRouter.post("/signup",SignUp)
AuthRouter.post("/signin",SignIn)

module.exports = AuthRouter