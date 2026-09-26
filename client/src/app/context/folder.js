"use client"
import { API } from "@/Utils/Utils";
import { createContext, useReducer } from "react";

let FolderS = {};

async function getFolders(authData) {
    try {
        const responce = await API.get(`/folder/getfolders/${authData?.userId}`, {
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return responce?.data;
    } catch (error) {
        console.log(error);
    }
}

async function createfolder(AuthData, body) {
    try {
        const responce = await API.post(`/folder/createfolder/${AuthData?.userId}`, body, {
            headers: { authorization: `bearer ${AuthData?.token}` },
        });
        return responce?.status;
    } catch (error) {
        console.log(error);
    }
}

async function AddNoteInFolder(authData, body) {
    try {
        const responce = await API.put(`/folder/addnotesInfolder/`, body, {
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return responce?.status;
    } catch (error) {
        console.log(error);
    }
}

async function deletefolder(authData, body) {
    try {
        const responce = await API.delete(`/folder/deletefolder/${body}`, {
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return responce?.status;
    } catch (error) {
        console.log(error);
    }
}

async function deleteNotesfromfolder(authData, body) {
    try {
        const responce = await API.put("/folder/deletenotesfromfolder", body, {
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return responce?.status;
    } catch (error) {
        console.log(error);
    }
}

async function getfolderlist(authData, body) {
    try {
        const responce = await API.get(`/folder/getfolderNotelist`, {
            params: body,
            headers: { authorization: `bearer ${authData?.token}` },
        });
        return responce?.data;
    } catch (error) {
        console.log(error);
    }
}

export const FolderContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "GET_FOLDERS":
            return { ...action.payload };

        default:
            return state;
    }
}

export const FolderProvider = ({ children }) => {
    const [state, Folderdispatch] = useReducer(reducer, FolderS);
    return (
        <FolderContext.Provider
            value={{
                folders: state,
                Folderdispatch,
                getFolders,
                createfolder,
                AddNoteInFolder,
                deletefolder,
                deleteNotesfromfolder,
                getfolderlist,
            }}
        >
            {children}
        </FolderContext.Provider>
    );
};
