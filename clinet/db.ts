import mongoose from "mongoose";

let isConnected=false;

export const connect=async()=>{
    if(isConnected){
        return;
    }
    await mongoose.connect("mongodb://localhost:27017/trailDb");
    console.log("isConnected");
    isConnected=true;
}
