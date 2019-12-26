import {Schema, model} from "mongoose";

const customerSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    vehicles:[{
        type:Schema.Types.ObjectId,
        ref:'vehicles'
    }]
});

export default model('customers',customerSchema);