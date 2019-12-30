import {Router} from "express";
import taskController from "../controllers/taskControllers";
class TaskRouter{

    router:Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/');
        this.router.post('/',taskController.saveTask);
    }
}

const taskRouter = new TaskRouter();
export default taskRouter.router;