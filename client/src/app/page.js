"use client"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home2 } from "./components/Notes2.0/Home2";
import { Main } from "./components/Auth/Main";

export default function Home() {
  const {AuthData} = useContext(AuthContext)
  return (
    <>
     {AuthData.token!==""?<Home2/>:<Main/>}
     </>
     
  );
}
