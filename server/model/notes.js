const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100 
  },
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String
    }
  ],
  userId: {
    type: String,
    required: true
  },

  Filters:{
    type:Array
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
  isPinned: {
    type: Boolean,
    default: false
  },
  folderId: {
    type: String,
    default: null
  },
  folderName: {
    type: String,
    default: null
  }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note
