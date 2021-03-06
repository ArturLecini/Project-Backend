
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from"helmet";
import * as jwt from "jsonwebtoken";
import * as bodyParser from "body-parser";
import routes from "./routes/";
const PORT = process.env.PORT || 3000;

createConnection()

.then(async () => {
    //create expresss app
    const app = express();

    //middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(bodyParser.json());
 
     //routes
     app.use('/',routes);
  
    //start exxpres server
    app.listen(PORT,() => console.log(`server online runing at ${PORT}`));
})
.catch(error => console.log(error));