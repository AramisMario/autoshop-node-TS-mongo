import {Response, Request} from "express";
import Refvehicle from "../models/refvehicle";
import Vehicles from "../models/vehicles";
import Customers from "../models/customers";
class VehicleControllers{

    async saveRefvehicle(req:Request, res:Response){
        const {brand, bmodel} = req.body;
        const newRfv = new Refvehicle({brand,bmodel});
        const created = newRfv.customSave();
        res.json(created);
    }

    async registVehicle(req:Request, res:Response){
        const {brand, bmodel,licenseplate,customerUrl} = req.body;

        const customer = await Customers.findOne({url:customerUrl});
        if (customer != null){

            const refv = await Refvehicle.findOne({brand:brand, bmodel:bmodel});
            let refUrl:String = "";
            if (refv == null){
                const newRfv =  new Refvehicle({brand,bmodel});
                newRfv.customSave();
                refUrl = newRfv.url;
            }else{
                refUrl = refv.url;
            }

            const newVehicle = new Vehicles({licenseplate,refUrl});
            try{
                await newVehicle.save();
            }catch(error){
                res.json({"message":error.message,"custom":"el vehiculo ya existe"});
             }

            customer["vehicles"].push(newVehicle.id);
            customer.save();
            }else{
                res.json({"message":"el usuario no existe"});
            }

        res.json({"message":"vehicle registered"});
    }

    async getVehicles(req:Request, res:Response){
        const vehicles = await Vehicles.find();
        res.json(vehicles);
    }

}

const vehicleControllers = new VehicleControllers();

export default vehicleControllers;