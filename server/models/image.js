import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    username:{type:String,required:true},
    image:{type:String,required:true},
    password:{type:String},
    id:{type:String}
})

export default mongoose.model("Image",imageSchema)