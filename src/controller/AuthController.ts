import {getRepository } from 'typeorm';
import {Request ,Response} from 'express';
import {USER} from '../entity/USER';
import * as jwt from "jsonwebtoken";
import config from '../check/config';
import { validate } from "class-validator";

 class AuthController {

    static login = async (req: Request, res : Response)=>{
       const{ EMAIL ,ROLE, PASSWORD } = req.body;
      
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
      res.status(401).send({EMAIL,success : false, status : "unauthorized ",code: "401",  message:`Password is not valid, `});;
      return;
    }
        //Sing JWT, valid for 2 hour
        const token = jwt.sign(
          { EMAIL: user.EMAIL, PASSWORD: user.PASSWORD},
          config.jwtSecret,
          { expiresIn: "2h" }
        );
        //Send the jwt in the response
        res.status(200).send({ token: `${token}`  ,
        EMAIL, ROLE: user.ROLE ,code: "200",  message:`login succesfully, ` , success : true});;
      };
      static signup = async(req: Request ,res: Response)=>{
        const {   FIRSTNAME, LASTNAME, EMAIL , PASSWORD , PHONE , ADRESS,ID,ROLE,CREATED} = req.body;
        const user= new USER();
        user.FIRSTNAME= FIRSTNAME;
        user.LASTNAME= LASTNAME;
        user.EMAIL=EMAIL;
        user.PASSWORD= PASSWORD;
        user.PHONE =PHONE;
        user.ADRESS= ADRESS;
        user.ID = ID;
        user.ROLE = ROLE;
        user.CREATED= CREATED;
        //validate
        
        if(user.EMAIL== "" && user.PASSWORD== "" ){
            return res.status(400).json({status : "bad request",code: "400",  message:"EMAIL  AND PASSWORD REQUIRED AND NOT EMPTY"});
              }
        else if(user.EMAIL== ""){
            return res.status(400).json({status : "bad request",code: "400",  message:"EMAIL REQUIRED AND NOT EMPTY"});
              }
              else if(user.PASSWORD== ""){
            return res.status(400).json({status : "bad request",code: "400",  message:"PASSWORD REQUIRED AND NOT EMPTY"});
            }
          
            
            const errors = await validate(user);
            if(errors.length > 0 )  {
                res.status(400).json(errors);
                return;
            }
            
    //Hash the password, to securely store on DB
    
    
    const userRepository = getRepository(USER);
    
    try{ 
        user.hashPassword();
        await userRepository.save(user);
    } catch (e) {
           res.status(409).json({status : "conflict",code: "409",message : `user ${EMAIL} alaready  in use`});
           return;
       }
    
       //If all ok, send 201 response
       res.status(201).json({ status : "true",code: "201", message : `user Created successfully`});
    };  
    
}
export default AuthController;