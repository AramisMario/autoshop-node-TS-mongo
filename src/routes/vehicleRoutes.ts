import vehicleControllers from "../controllers/vehicleControllers";
import {Router} from "express";

class VehicleRouter{

    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/ref', vehicleControllers.saveRefvehicle);
        this.router.post('/regist',vehicleControllers.registVehicle);
        this.router.get('/',vehicleControllers.getVehicles);
    }
}

const vehicleRouter = new VehicleRouter();

export default vehicleRouter.router;
