import {Router} from "express";
import authController from "../controllers/authControllers";
import {verifyToken} from "../controllers/middlewares/authMiddlewares";
class AuthRouter{
    
    router:Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/signIn',authController.signIn.bind(authController));
        this.router.post('/signUp',authController.signUp.bind(authController));
        this.router.get('/profile',verifyToken,authController.profile);
    }
}

const authRouter = new AuthRouter();
export default authRouter.router;