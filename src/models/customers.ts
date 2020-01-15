import {Schema, model, Document} from "mongoose";
import Bcrypt from "bcrypt";

interface ICustomer extends Document{
    identificationnumber:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    url:string,
    vehicles:[
        Schema.Types.ObjectId
    ],
    encryptPassword(password:string):Promise<string>,
    validatePassword(password:string):Promise<boolean>,
    setUrl():void
}

const customerSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    url:{type:String,required:true,unique:true},
    vehicles:[{
        type:Schema.Types.ObjectId,
        ref:'vehicles',
        required:false
    }],

});

customerSchema.methods.encryptPassword = async (password:string):Promise<string> =>  {
    const salt = await Bcrypt.genSalt(10);
    return Bcrypt.hash(password,salt);
}

customerSchema.methods.validatePassword = async function (password:string):Promise<boolean>{
    return Bcrypt.compare(password,this.password);
}

customerSchema.methods.setUrl = function():void {
    this.url = this.email.substring(0,this.email.indexOf('@'));
}

export default model<ICustomer>('customers',customerSchema);