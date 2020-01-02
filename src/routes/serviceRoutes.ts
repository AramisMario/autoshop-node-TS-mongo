import {Router} from "express";
import serviceController from "../controllers/serviceControllers";

class ServiceRouter{

    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/',serviceController.allServices);
        this.router.post('/',serviceController.saveService);
    }
}

const serviceRouter = new ServiceRouter();
export default serviceRouter.router;