"use client"

import { API, baseURL } from "@/Utils/Utils";
import axios from "axios";
import { createContext, useReducer } from "react";

let initialState = {
    token: "",
    userId: "",
};

if (typeof window !== "undefined") {
    try {
        const saved = JSON.parse(localStorage.getItem("UserData"));
        if (saved) {
            initialState = saved;
        }
    } catch (e) {
        console.error("Failed to parse saved UserData", e);
    }
}

async function UserSignUp(body) {
    try {
        const response = await API.post("/auth/signup", body);
        return response?.status;
    } catch (error) {
        console.log(error);
        return error?.response?.status;
    }
}

async function UserSignIn(body) {
    try {
        const response = await API.post("/auth/signin", body);
        return { status: response?.status, data: response?.data };
    } catch (error) {
        console.log(error);
        return { status: error?.response?.status, data: error?.response?.data };
    }
}

async function getprofile(authData) {
    try {
        const response = await API.get(`/profile/getprofile/${authData.userId}`, {
            headers: { authorization: `bearer ${authData.token}` },
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteaccount(authData) {
    try {
        const response = await API.delete(`/profile/deleteprofile/${authData.userId}`, {
            headers: { authorization: `bearer ${authData.token}` },
        });
        return response?.status;
    } catch (error) {
        console.log(error);
    }
}

async function profileupdate(authData, body) {
    try {
        const response = await API.put(`/profile/updateprofile/${authData.userId}`, body, {
            headers: { authorization: `bearer ${authData.token}` },
        });
        return response?.status;
    } catch (error) {
        console.log(error);
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "SIGN_IN": {
            const singinState = { ...action.payload };
            if (typeof window !== "undefined") {
                localStorage.setItem("UserData", JSON.stringify(singinState));
            }
            return singinState;
        }

        case "UPDATE_PROFILE": {
            const updatedState = { ...state, profilepic: action.payload };
            if (typeof window !== "undefined") {
                localStorage.setItem("UserData", JSON.stringify(updatedState));
            }
            return updatedState;
        }

        case "SIGN_OUT": {
            if (typeof window !== "undefined") {
                localStorage.clear();
            }
            return { token: "", userId: "" };
        }

        default:
            return state;
    }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, Authdispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider
            value={{
                AuthData: state,
                Authdispatch,
                UserSignUp,
                UserSignIn,
                getprofile,
                deleteaccount,
                profileupdate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};