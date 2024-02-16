import dotenv from "dotenv";
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"
import UserRouter from "./routes/user.js"
import ImageRouter from "./routes/image.js";


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))






app.use("/user",UserRouter)
app.use("/user",ImageRouter)

app.get("/",(req,res)=>{
    res.send("running")
})



mongoose.connect(process.env.MONGO_URI).then((then)=>{
app.listen(port,()=>{
    console.log("server is running");
})
})