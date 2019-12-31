import {Response,Request} from "express";
import Tasks from "../models/tasks";
class TaskController{

    async saveTask(req:Request, res:Response){
        const {task,tag, refAllowed, price, estimatedTime} = req.body;
        const newTask = new Tasks({task,tag,refAllowed,price,estimatedTime});
        const created = await newTask.save();
        res.json(created);
    }

}

const taskController = new TaskController(); 

export default taskController;
