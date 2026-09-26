import { NotesContext } from "@/app/context/NotesContext";
import React, { useContext } from "react";
import "./Note.css";

export const AllNotes = ({SetShowNote}) => {
  const { AllNOTES,notesdispatch } = useContext(NotesContext);
  
  // console.log(AllNotes);

  function ShowNotes(data) {
    try {
      notesdispatch({
        type: "SHOW_NOTES",
        payload: data,
      });
      SetShowNote(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Notes</h1>
        <div className="icons">
          <i className="fas fa-search"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>

      <div className="notes-grid">
        {AllNOTES?.Notes?.map((note, index) => (
          <div
            className="note"
            key={index}
            style={{
              backgroundColor: note.Filters[0].Color || "#fdfdfd",
              cursor: "pointer",
            }}
            onClick={()=>{
              ShowNotes(note)
            }}
          >
            <div className="note-content">
              <h3>
                {" "}
                {note.title.length > 17
                  ? note.title.substring(0, 15) + "..."
                  : note.title}
              </h3>

              <p className="mt-3">
                {note.content.length > 100
                  ? note.content.substring(0, 100) + "..."
                  : note.content}
              </p>
              <p className="mt-3">
                <span style={{ fontSize: "13px" }}>
                  {" "}
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="add-note">
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};
