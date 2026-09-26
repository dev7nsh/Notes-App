const folder = require("../model/folder");
const User = require("../model/user");
const Note = require("../model/notes");

function FolderNotesList(AllNOTES, findNotes) {
    try {
        if (!findNotes || !Array.isArray(findNotes.folderNotes)) {
            return [];
        }
        let NotesList = [];
        AllNOTES?.forEach((e) => {
            for (let i = 0; i < findNotes.folderNotes.length; i++) {
                if (e._id.toString() == findNotes.folderNotes[i].toString()) {
                    NotesList.push(e);
                }
            }
        });
        return NotesList;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.createfolder = async (req, res) => {
    try {
        const FolderName = new folder({
            ...req.body,
            folderCreator: req.params.id,
        });
        const createdfolder = await FolderName.save();
        await User.findByIdAndUpdate(req.params.id, {
            $push: { folders: createdfolder._id },
        });
        res.status(201).send({ createdfolder, msg: "folderCreated" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating folder");
    }
};

exports.getfolders = async (req, res) => {
    try {
        const Folders = await folder.find({ folderCreator: req.params.id });
        res.send({ Folders, msg: "Your floder" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching folders");
    }
};

exports.addnotesInfolder = async (req, res) => {
    try {
        const folderData = await folder.findById(req.body._id);
        if (!folderData) {
            return res.status(404).send("Folder not found");
        }
        let isinfolder = false;
        folderData.folderNotes.forEach((ele) => {
            if (ele == req.body.NoteId) {
                isinfolder = true;
            }
        });

        if (!isinfolder) {
            const Folder = await folder.findByIdAndUpdate(req.body._id, {
                $push: { folderNotes: req.body.NoteId },
            });
            // Stamp folderId and folderName on the note so NoteCard can show the folder icon
            await Note.findByIdAndUpdate(req.body.NoteId, {
                folderId: req.body._id,
                folderName: folderData.folderName,
            });
            res.send({ Folder, msg: "note added in folder" });
        } else {
            res.status(409).send("file already exists");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding note to folder");
    }
};

exports.deletenotesfromfolder = async (req, res) => {
    try {
        const { folderId, NoteId } = req.body;
        const Folder = await folder.findById(folderId);
        if (!Folder) {
            return res.status(404).send("Folder not found");
        }
        const updatefolder = Folder.folderNotes.filter((ele) => {
            return ele.toString() !== NoteId;
        });

        await folder.findByIdAndUpdate(folderId, {
            $set: { folderNotes: updatefolder },
        });
        // Clear folderId and folderName from the note so folder icon disappears
        await Note.findByIdAndUpdate(NoteId, {
            folderId: null,
            folderName: null,
        });
        res.send({ updatefolder, msg: "note deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting note from folder");
    }
};

exports.deletefolder = async (req, res) => {
    try {
        const deletedfolder = await folder.findByIdAndDelete(req.params.id);
        res.send({ deletedfolder, msg: "folder Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting folder");
    }
};

exports.getfolderNotelist = async (req, res) => {
    try {
        const Folder = await folder.findById(req.query.folderId);
        const Notes = await Note.find({ userId: req.query.NoteId });
        const FolderNotes = FolderNotesList(Notes, Folder);
        res.send({ FolderNotes, msg: "Your Folder Notes" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error getting folder notes list");
    }
};