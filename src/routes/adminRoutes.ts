import {Router} from "express";
import adminControllers from "../controllers/adminControllers";
class AdminRouter{

    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }


    routes(){
        this.router.post('/hire',adminControllers.hireEmployee);
    }
}

const adminRouter = new AdminRouter();

export default adminRouter.router;