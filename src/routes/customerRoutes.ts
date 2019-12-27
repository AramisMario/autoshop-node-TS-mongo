import {Request,Response,Router} from "express";
import Customer from "../models/customers";
import {Schema} from "mongoose";

class CustomerRouter{

    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async saveCustomer(req:Request, res:Response){
        const {
            identificationnumber, 
            firstname,
            lastname, 
            email,
            password,
            vehicles,
            } = req.body;

        const customer = new Customer({
            identificationnumber,
            firstname,
            lastname,
            email,
            password,
            vehicles
        }); 

        customer.password = await customer.encryptPassword(customer.password);
        const newC = await customer.save();
        res.json(newC);
    }

   async  getCustomers(req:Request, res:Response){
        const customers = await Customer.find();
        res.json(customers);
    }

    updateCustomer(){

    }

    routes(){
        this.router.get('/',this.getCustomers);
        this.router.post('/',this.saveCustomer);
    }
}

const custRoter = new CustomerRouter();
export default custRoter.router;