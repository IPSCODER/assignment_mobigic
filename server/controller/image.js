import imageSchema from "../models/image.js";
import userSchema from "../models/users.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const secret = "test";

export const imagePost =  async (req,res) =>{
    const {imgUrl,username} = req.body;
    try{
        const oldUser = await userSchema.findOne({username});
            if (!oldUser) {
                return res.status(404).json({message:"User doesnt exist"});
            }

            const result = await imageSchema.create({
                username,
                image:imgUrl
              });

              res.status(201).json({ result });
    }catch(err){
        console.log(err);
    }
}

export const imageGet =  async (req,res) =>{
    const {username} = req.body;
    try{
        const oldUser = await userSchema.findOne({username});
            if (!oldUser) {
                return res.status(404).json({message:"User doesnt exist"});
            }

            const result = await imageSchema.find({username});

              res.status(201).json({ result });
    }catch(err){
        console.log(err);
    }
}

export const imageDownload = async (req,res) => {

    const {username,password} = req.body;

    try{ 
        const oldUser = await userSchema.findOne({username});

        if (!oldUser) {
            return res.status(404).json({message:"User doesnt exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)

        if(!isPasswordCorrect) return res.send("wrong password")

        
        res.status(200).json({result:true})
        

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    }
}

export const imageDelete = async (req,res) =>{
    const {username,password,_id} = req.body;
    try{
        const oldUser = await userSchema.findOne({username});

        if (!oldUser) {
            return res.status(404).json({message:"User doesnt exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)

        if(!isPasswordCorrect) return res.send("wrong password")

        const result = await imageSchema.findByIdAndDelete({_id});

        res.status(201).json({ result:true });
        

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    }
}