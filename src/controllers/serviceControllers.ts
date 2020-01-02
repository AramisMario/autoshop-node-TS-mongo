import Services from "../models/services";
import {Response, Request} from "express";
import vehicleControllers from "./vehicleControllers";
import vehicles from "../models/vehicles";
import mechanics from "../models/mechanics";

class ServiceController{

    async saveService(req:Request, res:Response){
        const {
            indate,
            outdate,
            receptionist,
            details
            } = req.body;
        const service = new Services({
            indate:indate,
            outdate:outdate,
            receptionist:receptionist,
            details:details
        });
        await service.save();
        res.json(service);
    }

    async allServices(req:Request, res:Response){
        const services = await Services.find().populate({
            path:'details.vehiclesAndTasks.vehicle',
            populate:{
                path:'vehicle',
                model:'vehicles',
            }
        }).populate({
            path:'details.vehiclesAndTasks.tasks.mechanic',
            populate:{
                path:'mechanic',
                model:'mechanics'
            },
            // select:'-password'
        }).populate({
            path:'details.vehiclesAndTasks.tasks.task',
            populate:{
                path:'details.vehiclesAndTasks.tasks.task',
                model:'tasks'
            }
        });
        res.json(services);
    }
}

const servecController = new ServiceController();
export default servecController;
