import ReceptModel from "../models/receptionists";
import MechanModel from "../models/mechanics";
import {Response, Request} from "express";


class AdminController{

    async hireEmployee(req:Request,res:Response){
        const {identificationnumber,
            firstname,
            lastname,
            email,
            password,
            socialsecuritynumber,
            rol
            } = req.body;

        if(rol === "receptionist"){
            const receptionist = new ReceptModel({identificationnumber,firstname,lastname,email,password,socialsecuritynumber});
            receptionist.password = await receptionist.encryptPassword(receptionist.password);
            const created = await receptionist.save();
            res.json(created);
        }else if(rol === "mechanic"){
            const mechanic = new MechanModel({identificationnumber,firstname,lastname,email,password,socialsecuritynumber});
            mechanic.password = await mechanic.encryptPassword(mechanic.password);
            const created = await mechanic.save();
            res.json(created);
        }
    }

    // async allEmployees(req:Request, res:Response){
    //     const mechanics = 
    // }
}

const adminControllers = new AdminController();
export default adminControllers;
