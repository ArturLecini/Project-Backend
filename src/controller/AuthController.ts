import {getRepository } from 'typeorm';
import {Request ,Response} from 'express';
import {USER} from '../entity/USER';
import * as jwt from "jsonwebtoken";
import config from '../check/config';
import { validate } from "class-validator";

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

     //Check if encrypted password match
    if (!user.checkPassword(PASSWORD)) {
      res.status(401).send().json({status : "unauthorized",code: "401",  message:`token is not valid, `});;
      return;
    }
        //Sing JWT, valid for 2 hour
        const token = jwt.sign(
          { EMAIL: user.EMAIL, PASSWORD: user.PASSWORD },
          config.jwtSecret,
          { expiresIn: "2h" }
        );
        //Send the jwt in the response
        res.status(200).send(user).json({   idToken: token, 
           code: "200", token: '', message:`token is valid, `});;
      };
        
    
}
export default AuthController;