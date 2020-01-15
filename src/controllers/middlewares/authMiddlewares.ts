import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface Ipayload{ // allow access to the properties of payload
    id:string,
    email:string,
    rol:string,
    iat:number,
    exp:number
}
export const verifyToken = (req:any,res:Response,next:NextFunction) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json('acceso denegado');
    }else if(process.env.JWTKEY !== undefined){
        try{
            const payload = jwt.verify(token,process.env.JWTKEY) as Ipayload;
            console.log(payload);
            req.userEmail = payload.email; 
            next();
        }catch(error){
            console.log(error);
            if(error.name === 'TokenExpiredError') res.send('token expired');
            if(error.name === 'JsonWebTokenError') res.send('something went wrong with the token');
        }

    }
    

}