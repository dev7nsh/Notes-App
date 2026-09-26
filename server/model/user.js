const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ProfilePicture:{
        type:String
    },

    notes:{
        type:Array
    },

    folders:{
        type:Array
    },
})

const User = mongoose.model("User",UserSchema)
module.exports = User

