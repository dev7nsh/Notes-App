const { default: mongoose } = require("mongoose");

const folderSchema = mongoose.Schema({
    folderName:{
        type:String
    },

    folderCreator:{
        type:String
    },

    folderNotes:{
        type:Array
    },

    color:{
        type:String
    },

    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      isArchived: {
        type: Boolean,
        default: false
      },
})

const folder = mongoose.model("folder",folderSchema)
module.exports = folder