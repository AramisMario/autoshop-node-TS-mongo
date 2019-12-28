import {Response, Request} from "express";
import Refvehicle from "../models/refvehicle";
import Vehicles from "../models/vehicles";
import Customers from "../models/customers";
class VehicleControllers{

    async saveRefvehicle(req:Request, res:Response){
        const {brand, bmodel} = req.body;
        const newRfv = new Refvehicle({brand,bmodel});
        newRfv.setUrl();
        const created = await newRfv.save();
        res.json(created);
    }

    async registVehicle(req:Request, res:Response){
        const {refUrl,licenseplate,customerUrl} = req.body;
        const newVehicle = new Vehicles({licenseplate,refUrl});
        try{
        const newVh = await newVehicle.save();
        const customer = await Customers.findOne({url:customerUrl});
            if (customer != null){
                customer["vehicles"].push(newVh.id);
                customer.save();
             }
            res.json({"message":"updated"});
        }catch(error){
            if (error.code === 11000){
                res.send("entrada duplicada");
            }
        }
    }

    async getVehicles(req:Request, res:Response){
        const vehicles = await Vehicles.find();
        res.json(vehicles);
    }

}

const vehicleControllers = new VehicleControllers();

export default vehicleControllers;