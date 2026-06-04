import express,{Request,Response,NextFunction} from "express";
const app = express();
import { logger } from "./Utils/logger";
import { StatusCodes } from "./Constant/StatusCode";
import handleErrorsMiddleware from "./Middleware/errorHandler";
import cookieParser from "cookie-parser"
import cors from "cors";
import { sessionConfig,env } from "./config";


//application middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use(cookieParser()); //req.cookie parser
app.use(sessionConfig());
app.use(express.json()); // read req.body
app.use(express.urlencoded({extended:true})); //read form data


app.get("/get",(req,res)=>{
    res.status(StatusCodes.OK).json(
        {message:"Health okay",
            success:true,
            data:null,
            error:null
        });
})

app.use((req:Request,res:Response,next:NextFunction)=>{
    logger.info({method:req.method,path:req.path});
    next();
})

app.use(handleErrorsMiddleware);


app.listen(()=>{
    console.log(`http://localhost:${env.PORT}`);
})