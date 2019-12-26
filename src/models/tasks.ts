import {Schema, model} from "mongoose";

const taskSchema = new Schema({
    task:{type:String, required: true},
    tag:{type:String},
    refAllowed:[{
        type:Schema.Types.ObjectId,
        ref:'refvehicle'
    }],
    price:{type:Number, required:true}
});
