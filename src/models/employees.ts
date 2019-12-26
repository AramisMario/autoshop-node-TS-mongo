import {Schema, model} from "mongoose";
const extendSchema = require("mongoose-schema-extend");
// import extendSchema from "mongoose-schema-extend"; no @types found for this

const employeeSchema = new Schema({
    identificationnumber:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    socialsecuritynumber:{type:String, required:true, unique:true}
});

const receptionistSchema = extendSchema(employeeSchema);
const mechanicSchema = extendSchema(employeeSchema,{
    skills:[{
        type:String,
    }]
});

export default {
    receptModel:model('recepcionists',receptionistSchema),
    mechanModel:model('mechanics',mechanicSchema)
}
