import React, { useState } from 'react'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'

export const Main = () => {
  const [mode, setMode] = useState("signin"); // Single state for all modes

  return (
    <>
      <div className='' style={{ height: "100vh" }}>
        
        {mode === "signin" && <SignIn setMode={setMode} />}
        {mode === "signup" && <SignUp setMode={setMode} />}
      </div>
    </>
  );
}
