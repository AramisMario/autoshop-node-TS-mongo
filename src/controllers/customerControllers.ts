import Customers from "../models/customers";
import {Response, Request} from "express";
class CustomerControllers{

    async saveCustomer(req:Request, res:Response){
        const {
            identificationnumber, 
            firstname,
            lastname, 
            email,
            password,
            vehicles,
            } = req.body;

        const customer = new Customers({
            identificationnumber,
            firstname,
            lastname,
            email,
            password,
            vehicles
        }); 

        customer.password = await customer.encryptPassword(customer.password);
        customer.setUrl();
        const newC = await customer.save();
        res.json(newC);
    }

    async getCustomers(req:Request, res:Response){
        const customers = await Customers.find();
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

