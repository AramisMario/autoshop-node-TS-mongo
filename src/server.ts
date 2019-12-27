import express from 'express';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import customerRouter from "./routes/customerRoutes";
class Server{

    app:express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){

        const MONGO_URI = 'mongodb://localhost/autoshop';

        mongoose.connect(MONGO_URI,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log('db is connected'));

        this.app.set('port',3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/customers',customerRouter);   
    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(`server runnig on port ${this.app.get('port')}`)
        });
    }
}

const server = new Server();

export default server; 