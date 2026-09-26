import React, { useContext, useEffect, useState } from "react";
import "./Home2.css";
import { ShowN } from "./ShowN";
import { Main } from "./Main";
import { Notes } from "./Notes";
import { AllNotes } from "./AllNotes";
import { AuthContext } from "@/app/context/AuthContext";
import Navbar from "../Auth/navbar";

export const Home2 = () => {
  const [showNote, SetShowNote] = useState(false);
  const [WriteNote,setWriteNote] = useState(false)
  const [ShowAllNotes,SetShowAllNotes] = useState(false)
  const {AuthData} = useContext(AuthContext)

  return (
    <>
    <Navbar/>

      <div
        className="d-flex ms-4"
        style={{ width: "100%", height: "90vh" }}
      >
        <div
          className="ms-1"
          style={{
            width: "12%",
            height: "90vh",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="d-flex flex-column mt-5 align-items-center">
         <div className="d-flex " style={{cursor:"pointer"}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
</svg>
            <h4 className="ms-2" style={{fontSize:"15px",fontWeight:"700"}}>Add new</h4>
         </div>
         <div className="d-flex flex-column" style={{cursor:"pointer"}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" className="bi bi-circle-fill mt-2" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-circle-fill mt-2" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-circle-fill mt-2" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg>
         </div>

         <div className="mt-5">
         <div className="d-flex " style={{cursor:"pointer"}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM2.545 3h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1c0-.276.244-.5.545-.5"/>
</svg>

<h4 className="ms-2" style={{fontSize:"15px",fontWeight:"700",color:"#aaa5a5"}}>Calander</h4>

         </div>

         <div className="d-flex  mt-3" style={{cursor:"pointer"}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
</svg>
            <h4 className="ms-2" style={{fontSize:"15px",fontWeight:"700",color:"#aaa5a5"}}>Archive</h4>
         </div>

         <div className="d-flex  mt-3 " style={{cursor:"pointer"}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
            <h4 className="ms-2" style={{fontSize:"15px",fontWeight:"700",color:"#aaa5a5"}}>Trash</h4>
         </div>
         </div>

          </div>
        </div>
        {showNote ? (
          <ShowN setWriteNote={setWriteNote} SetShowNote={SetShowNote}/>
        ) : WriteNote? <Notes setWriteNote={setWriteNote}/>
        :ShowAllNotes?<AllNotes SetShowNote={SetShowNote}/>:<Main SetShowNote={SetShowNote} setWriteNote={setWriteNote} SetShowAllNotes={SetShowAllNotes}/>
         }
      </div>

 
    </>
  );
};
