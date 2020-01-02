import {Schema, model, Document} from "mongoose";

interface IService extends Document{
    indate:Date,
    outdate:Date,
    receptionist:Schema.Types.ObjectId,
    details:{
        description:String,
        vehiclesAndTasks:[{
            vehicle:Schema.Types.ObjectId,
            tasks:[{
                task:Schema.Types.ObjectId,
                finished:Boolean,
                mechanic:Schema.Types.ObjectId
            }]
        }]
    }
};


const serviceSchema = new Schema({
    indate:{type:Date,required:true},
    outdate:{type:Date,default:null},
    receptionist:{type: Schema.Types.ObjectId, required:true, ref:'receptionists'},

    details:{
        description: {type:String},

        vehiclesAndTasks:[{
            _id:false,
            vehicle:{type:Schema.Types.ObjectId, ref:'vehicles'},
            tasks:[{
                _id:false,
                task:{type:Schema.Types.ObjectId, ref:'tasks'},
                finished:{type:Boolean,default:false},
                mechanic:{type:Schema.Types.ObjectId, ref:'mechanics'}
            }]
        }]
    }
});

export default model<IService>('services',serviceSchema);
