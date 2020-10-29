import {getRepository } from 'typeorm';
import {Request ,Response} from 'express';
import {USER} from '../entity/USER';
import * as jwt from "jsonwebtoken";
import config from '../check/config';
 class AuthController {

    static login = async (req: Request, res : Response)=>{
       const{ EMAIL , PASSWORD } = req.body;
        
            if(!(EMAIL && PASSWORD)){   
         return res.status(400).json({message:'passwrd & password are required!'});
      }
        const userReposity = getRepository(USER);
        let user: USER; 
        try {
            user = await userReposity.findOneOrFail({where : {EMAIL}  });  
        }
        catch(e){
            return res.status(400).json({message: 'Username  incorect !'});
        } 
         try {
            user = await userReposity.findOneOrFail({where : {PASSWORD}  });
        }
        catch(e){
            return res.status(400).json({message: ' password incorect !'});
        }  //Sing JWT, valid for 1 hour
        const token = jwt.sign(
          { EMAIL: user.EMAIL, PASSWORD: user.PASSWORD },
          config.jwtSecret,
          { expiresIn: "1h" }
        );
        //Send the jwt in the response
        res.send(token);
      };
        
    
}
export default AuthController;