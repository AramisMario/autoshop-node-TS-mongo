import {Schema, model, Document} from "mongoose";

interface ITask extends Document{
    task:string,
    tag:string,
    refAllowed:[Schema.Types.ObjectId],
    allRef?:string,
    price:number,
    estimatedTime:{
        "days":number,
        "hours":number,
        "minutes":number
    }
}

const taskSchema = new Schema({
    task:{type:String, required: true},
    tag:{type:String},
    refAllowed:[{type:Schema.Types.ObjectId, ref:'refvehicles'}],
    allRef:String,
    price:{type:Number, required:true},
    estimatedTime:{
        "days":{type:Number},
        "hours":{type:Number},
        "minutes":{type:Number}
    }
});

export default model<ITask>('tasks', taskSchema);