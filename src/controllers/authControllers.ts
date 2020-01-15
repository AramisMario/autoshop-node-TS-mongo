import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import Customers from "../models/customers";
import Mechanics from "../models/mechanics";
import Receptionist from "../models/receptionists";
import dotenv from "dotenv";
dotenv.config();

class AuthController{

    generateToken(id:string, email:string, rol?:string):Object{
        const payload:{id:string,email:string,rol?:string} = {
            id:id,
            email:email,
        }
        if(rol) payload["rol"] = rol;

        if(process.env.JWTKEY !== undefined){
            const token = jwt.sign(payload,process.env.JWTKEY,{expiresIn:'2m'});
            return {"token":token};
        }
        return {"message":"something went wrong"};

    }

    async signUp(req:Request,res:Response){
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
        const token = this.generateToken(newC._id,newC.email);
        res.json(token);
    }

    async signIn(req:Request,res:Response){
        const {email, password, rol} = req.body;
        let user = undefined;
    
        if(rol === 'customer') user = await Customers.findOne({email:email});
        if(rol === 'mechanical') user = await Mechanics.findOne({email:email});
        if(rol === 'receptionist') user = await Receptionist.findOne({email:email});

        if(user !== null && user !== undefined){
            const valid = await user.validatePassword(password);
            if(valid){
                const token = this.generateToken(user._id,user.email,rol);
                res.json(token);
            }else{
                res.json({"message":"invalid password"});
            }
        }else{
            res.json({"message":"user not found"});
        }
    }

    profile(req:any,res:Response){
        console.log(req.userEmail);
        console.log(req.headers['auth-token']);
        res.send('profile');
    }


}

const authController = new AuthController();
export default authController;