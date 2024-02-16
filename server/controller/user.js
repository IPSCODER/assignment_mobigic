import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import userSchema from "../models/users.js"

const secret = "test";


export const signin = async (req,res) =>{
    const {username,password} = req.body;
    

    try{
        const oldUser = await userSchema.findOne({username});

        if (!oldUser) {
            return res.send("Register first");
        }

        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)

        if(!isPasswordCorrect) return res.send("wrong password")

        const token = jwt.sign({username: oldUser.username, id:oldUser._id},secret,{expiresIn:"1h"})
        res.status(200).json({result:oldUser,token})
        

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
      console.log(err);
    }
}


export const signup = async (req,res) =>{
  const { username, password, } = req.body;
  try {
    const oldUser = await userSchema.findOne({ username });
    

    if (oldUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userSchema.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ username: result.username, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
}