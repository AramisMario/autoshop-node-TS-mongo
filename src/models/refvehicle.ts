import {Schema, model, Document} from "mongoose";

interface IRefvehicle extends Document{
    brand:string,
    bmodel:string
    url:string,
    setUrl():void,
    customSave():void
}

const refvechicleSchema = new Schema({
    brand:{type:String},
    bmodel:{type:String},
    url:{type:String,unique:true}
});

refvechicleSchema.methods.setUrl = function ():void{
    this.url = this.brand + "-" + this.bmodel;
}

refvechicleSchema.methods.customSave = async function (){
    this.url = this.brand + "-" + this.bmodel;
    return await this.save();
}


export default model<IRefvehicle>('refvehicles',refvechicleSchema);