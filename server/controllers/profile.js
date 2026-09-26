const folder = require("../model/folder");
const Note = require("../model/notes");
const User = require("../model/user");

exports.getprofile = async (req, res) => {
    try {
        let myprofile = await User.findOne({ _id: req.params.id });
        if (!myprofile) {
            return res.status(404).send("User not found");
        }
        myprofile = myprofile.toObject();
        delete myprofile.password;
        res.send({ myprofile, msg: "profile get" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error getting profile");
    }
};

exports.deleteaccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const deleteNotes = await Note.deleteMany({ userId: req.params.id });
        const deleteFolder = await folder.deleteMany({ folderCreator: req.params.id });
        res.send({ user, deleteFolder, deleteNotes, msg: "User" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting account");
    }
};

exports.updateprofile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                email: req.body.email,
                ProfilePicture: req.body.ProfilePicture,
            },
            { new: true }
        );
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating profile");
    }
};
