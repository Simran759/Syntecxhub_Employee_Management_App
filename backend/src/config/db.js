// import express from 'express'

// import dotenv from 'dotenv'
// dotenv.config();
import mongoose from 'mongoose'

const connectDB = async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Employee"
        });
        console.log("Mongodb Connected SuccessFully");
    }catch(err)
    {
        console.log("Error in connecting database",err);
        process.exit(1);
    }


};
// connectDB();
export default connectDB;
