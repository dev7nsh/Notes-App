import React from "react";
import { FaFolder } from "react-icons/fa";
import "./NoteCard.css"

const NoteCard = ({ note, onShowNotes }) => {
  const { title, content, createdAt, Filters, tags, folderId, folderName } = note;
  const backgroundColor = Filters?.[0]?.Color || "#fdfdfd";

  return (
    <div
      className="note-card mt-2"
      style={{ backgroundColor, cursor: "pointer" }}
      onClick={() => onShowNotes(note)}
    >
      {/* Date Section */}
      <span className="note-date" style={{ fontSize: "13px" }}>
        {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </span>

      {/* Folder Indicator */}
      {folderId && (
        <div
          className="note-folder-indicator"
          title={folderName ? `Folder: ${folderName}` : "In a folder"}
        >
          <FaFolder className="note-folder-icon" />
          {folderName && (
            <span className="note-folder-name">{folderName}</span>
          )}
        </div>
      )}

      {/* Header Section */}
      <div
        className="d-flex card-header justify-content-between align-items-center"
        style={{ backgroundColor }}
      >
        <h3 className="note-title align-self-center">
          {title.length > 17 ? title.substring(0, 15) + "..." : title}
        </h3>
        <span style={{ fontWeight: "900" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-file-earmark-fill align-self-center"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 1 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
          </svg>
        </span>
      </div>

      {/* Content Section */}
      <p className="note-content">
        {content?.length > 100 ? content.substring(0, 80) + "..." : content}
      </p>

      {/* Tags Section */}
      <div className="note-tags">
        {tags?.length
          ? tags.map((tag, i) => (
              <span key={i} className="note-tag">
                #{tag}
              </span>
            ))
          : <span className="note-tag">No Tags</span>}
      </div>

      {/* Footer Section */}
      <div
        className="note-footer card-footer mt-1 d-flex justify-content-between"
        style={{ backgroundColor }}
      >
        <span>
          {new Date(createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
        <span className="is-pinned">Pinned</span>
      </div>
    </div>
  );
};

export default NoteCard;
