import Customers from "../models/customers";
import {Response, Request} from "express";
class CustomerControllers{

    async getCustomers(req:Request, res:Response){
        const customers = await Customers.find().populate({path:'vehicles',populate:{path:'refvehicle',model:'refvehicles'}});
        res.json(customers);
    }

    async getCustomer(req:Request, res:Response){
        const customer = await Customers.findOne({url:req.params.url}).select("firstname lastname email vehicles -_id");
        res.json(customer);
    }

    updateCustomer(){

    }
}
const customerControllers = new CustomerControllers();
export default customerControllers;

