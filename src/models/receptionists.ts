import {Schema, model, Document} from "mongoose";
import Bcrypt from "bcrypt";


interface IReceptionist extends Document{
    identificationnumber:String,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    socialsecuritynumber:String,
    encryptPassword(password:String):Promise<String>
}

const receptionistSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    socialsecuritynumber:{type:String, required:true, unique:true}
});

receptionistSchema.methods.encryptPassword = async (password:String):Promise<String> =>  {
    const salt = await Bcrypt.genSalt(10);
    return Bcrypt.hash(password,salt);
}

export default model<IReceptionist>('receptionist',receptionistSchema);