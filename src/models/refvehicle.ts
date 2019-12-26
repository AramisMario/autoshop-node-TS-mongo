import {Schema, model} from "mongoose";

const refvechicleSchema = new Schema({
    brand:{type:String},
    model:{type:String}
});

export default model('refvehicle',refvechicleSchema);