"use client";

import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {
  const session=useSession();
  console.log(session);

  const handleSubmit=()=>{

  }
  return (
   <div className="flex justify-between">
   <div>
    <h1>FlatMate</h1>

   </div>

   <div>
    {session.data?.user ? <button onClick={()=>{
      signOut()
    }}>SignOut</button> : <button onClick={()=>{
      signIn()
    }}>SignIn</button>}

   </div>
   </div>
  );
}
