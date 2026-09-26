"use client"

import { API } from "@/Utils/Utils";
import { createContext, useReducer } from "react";

let AllNotes = {};
let NotesContent = {};

async function GetNotes(authData) {
    try {
        const response = await API.get(`/notes/getnotes/${authData?.userId}`, {
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.status;
    }
}

async function AddNotes(AuthData, body) {
    try {
        const response = await API.post(`/notes/addnotes/${AuthData?.userId}`, body, {
            headers: { authorization: `bearer ${AuthData?.token}` },
        });
        return response?.status;
    } catch (error) {
        console.log(error);
        return error?.response?.status;
    }
}

async function deleteNote(authData, body) {
    try {
        const response = await API.delete("/notes/deletenotes", {
            params: body,
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return response?.status;
    } catch (error) {
        console.log(error);
        return error?.response?.status;
    }
}

async function updateNotes(authDataOrId, idOrBody, optionalBody) {
    try {
        let token = "";
        let id = "";
        let body = {};
        if (typeof authDataOrId === "object" && authDataOrId?.token) {
            token = authDataOrId.token;
            id = idOrBody;
            body = optionalBody || {};
        } else {
            id = authDataOrId;
            body = idOrBody || {};
        }
        const config = token ? { headers: { authorization: `bearer ${token}` } } : {};
        const response = await API.put(`/notes/updatenotes/${id}`, body, config);
        return response?.status;
    } catch (error) {
        console.log(error);
        return error?.response?.status;
    }
}

export const NotesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "GET_ALL_NOTES":
            return { ...action.payload };
        default:
            return state;
    }
}

function notesReducer(state2, action) {
    switch (action.type) {
        case "SHOW_NOTES":
            return { ...action.payload };
        default:
            return state2;
    }
}

export const NotesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, AllNotes);
    const [state2, notesdispatch] = useReducer(notesReducer, NotesContent);
    return (
        <NotesContext.Provider
            value={{
                GetNotes,
                AddNotes,
                AllNOTES: state,
                dispatch,
                showNote: state2,
                notesdispatch,
                deleteNote,
                updateNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};