const Note = require("../model/notes");
const User = require("../model/user");

exports.addNotes = async (req, res) => {
    try {
        const userId = req.params.id;
        const Tags = Array.isArray(req.body.tags) ? [...req.body.tags] : [];
        const notes = new Note({
            ...req.body,
            userId: userId,
            tags: Tags,
        });
        const noteid = notes._id;
        const pushPayload = { notes: noteid };
        if (req.body.Filters) {
            pushPayload.Filters = req.body.Filters;
        }
        const user = await User.findByIdAndUpdate(userId, {
            $push: pushPayload,
        });

        const notestobeaded = await notes.save();
        res.status(201).send({ notestobeaded, user, msg: "note is added" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding note");
    }
};

exports.getNotes = async (req, res) => {
    try {
        const Notes = await Note.find({ userId: req.params.id });
        res.send({ Notes, msg: "Your Notes" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching notes");
    }
};

exports.updateNotes = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        const updateTime = Date.now();
        const updatednote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                createdAt: note.createdAt,
                updatedAt: updateTime,
            },
            { new: true }
        );
        res.send({ updatednote, msg: "note updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating note");
    }
};

exports.deletenotes = async (req, res) => {
    try {
        const { userId, id } = req.query;
        const user = await User.findById(userId);

        const deletenote = await Note.findByIdAndDelete(id);
        if (user && user.notes) {
            const updateuser = user.notes.filter((ele) => {
                return ele && ele.toString() !== id;
            });

            await User.findByIdAndUpdate(userId, {
                $set: { notes: updateuser },
            });
            res.send({ updateuser, deletenote, msg: "note deleted" });
        } else {
            res.send({ deletenote, msg: "note deleted" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting note");
    }
};

