import {Request,Response,Router} from "express";
import customerControllers from "../controllers/customerControllers";
class CustomerRouter{

    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/',customerControllers.getCustomers);
        this.router.get('/:url',customerControllers.getCustomer);
        this.router.post('/',customerControllers.saveCustomer);
    }
}

const custRoter = new CustomerRouter();
export default custRoter.router;