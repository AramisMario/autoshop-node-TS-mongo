import {Schema, model, Document} from "mongoose";


interface IVehicle extends Document{
    licenseplate:String,
    refvehicle:Schema.Types.ObjectId
}

const vehicleSchema = new Schema({
    licenseplate:{type:String,required:true, unique:true},
    refvehicle:{type:Schema.Types.ObjectId, ref:'refvehicle'}
});

export default model<IVehicle>('vehicles',vehicleSchema);