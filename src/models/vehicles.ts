import {Schema, model} from "mongoose";

const vehicleSchema = new Schema({
    licenseplate:{type:String,required:true, unique:true},
    refvehicle:{type:Schema.Types.ObjectId, ref:'refvehicle'}
});

export default model('vehicles',vehicleSchema);