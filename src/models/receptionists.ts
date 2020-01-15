import {Schema, model, Document} from "mongoose";
import Bcrypt from "bcrypt";


interface IReceptionist extends Document{
    identificationnumber:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    socialsecuritynumber:string,
    encryptPassword(password:string):Promise<string>,
    validatePassword(password:string):Promise<boolean>
}

const receptionistSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    socialsecuritynumber:{type:String, required:true, unique:true}
});

receptionistSchema.methods.encryptPassword = async (password:string):Promise<string> =>  {
    const salt = await Bcrypt.genSalt(10);
    return Bcrypt.hash(password,salt);
}

receptionistSchema.methods.validatePassword = async function (password:string):Promise<boolean>{
    return Bcrypt.compare(password,this.password);
}

export default model<IReceptionist>('receptionists',receptionistSchema);