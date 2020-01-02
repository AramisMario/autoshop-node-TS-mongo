import {Response,Request} from "express";
import Tasks from "../models/tasks";
class TaskController{

    async saveTask(req:Request, res:Response){
        const {task,tag, refAllowed, price, estimatedTime,allRef} = req.body;
        const newTask = new Tasks({task,tag,refAllowed,price,estimatedTime,allRef});
        const created = await newTask.save();
        res.json(created);
    }


    async allTask(req:Request, res:Response){
        const tasks = await Tasks.find().populate({path:'refAllowed'});
        res.json(tasks);
    }

}

    

const taskController = new TaskController(); 

export default taskController;

