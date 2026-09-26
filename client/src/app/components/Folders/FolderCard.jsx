import React, { useContext } from "react";
import "./FolderCard.css"
import { AuthContext } from "@/app/context/AuthContext";

const FolderCard = ({ folder, onFolderClick,SetfolderID ,SetFolderList }) => {
  const { folderName, createdAt, color, _id, folderCreator } = folder;
  const {AuthData} = useContext(AuthContext)
  const handleClick = () => {
    SetfolderID(_id);
    SetFolderList(true);
    const body = {
      folderId: _id,
      NoteId: folderCreator,
    };
    onFolderClick(AuthData,body);
  };

  return (
    <div
      className="folder-card-container"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="folder-card-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="#9297f9"
          className="bi bi-file-earmark-fill"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 1 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
        </svg>
      </div>

      {/* Folder Name */}
      <h5 className="folder-card-title">{folderName}</h5>

      {/* Created Date */}
      <p className="folder-card-date">
        {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default FolderCard;
