import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import problemRouter from "./routes/problem.route.js";
import submissionRouter from "./routes/submission.route.js";
import runRouter from "./routes/run.route.js";
import submissionDetailsRouter from "./routes/submissionDetails.route.js";
import dashboardRouter from "./routes/dashboard.route.js";



const app=express();

app.set("port" , (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb" , extended: true}))

app.use("/api/v1/users", userRouter);
app.use("/api/problem", problemRouter);
app.use("/api/submission", submissionRouter);
app.use("/api/run", runRouter);
app.use("/api/submission/details", submissionDetailsRouter);
app.use("/api/dashboard", dashboardRouter);

const start = async ()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://sakshamg1152_db_user:P8DUtoosHpsi6WwG@cluster0.pzfkrew.mongodb.net/?appName=Cluster0");
    console.log("connected to DB")
    app.listen(8000 , ()=>{
        console.log("listening to the port");
    });
}


start();
