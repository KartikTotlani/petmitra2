import mongoose, { mongo } from "mongoose";

const ngoSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    image: {type:String, required:true},
    address: {type:Object, default: {line1:'', line2:''}},
    phone: {type:String, default:"0000000000"},
})

const ngoModel = mongoose.models.ngo || mongoose.model('ngo',ngoSchema)

export default ngoModel