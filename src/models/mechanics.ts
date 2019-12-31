import {Schema, model, Document} from "mongoose";
import Bcrypt from "bcrypt";


interface IMechanic extends Document{
    identificationnumber:String,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    socialsecuritynumber:String,
    skills:[String],
    encryptPassword(password:String):Promise<String>
}

const mechanicSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    socialsecuritynumber:{type:String, required:true, unique:true},
    skills:[{type:String}]
});

mechanicSchema.methods.encryptPassword = async (password:String):Promise<String> =>  {
    const salt = await Bcrypt.genSalt(10);
    return Bcrypt.hash(password,salt);
}

export default model<IMechanic>('mechanics',mechanicSchema);