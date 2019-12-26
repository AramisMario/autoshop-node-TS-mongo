import {Schema, model} from "mongoose";

const serviceSchema = new Schema({
    indate:{type:Date,required:true},
    outdate:{type:Date,required:false},
    receptionist:{type: Schema.Types.ObjectId, required:true},

    details:[{
        description: {type:String},

        vehiclesAndTasks:[{
            vechicle:{type:Schema.Types.ObjectId, ref:'vehicles'},
            tasks:[{
                task:{type:Schema.Types.ObjectId, ref:'tasks'},
                finished:{type:Boolean},
                mechanic:{type:Schema.Types.ObjectId, ref:'mechanics'}
            }]
        }],
    }]

});

export default model('services',serviceSchema);
