import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";

export class ChangePassword{
  static chPassword = async (req: Request, res: Response) => {
    let user ;
    
    const{ID}= req.params;
    const { EMAIL,PASSWORD }= req.body;
    const userRepository =getRepository(USER);
    //try get user

    try{
        user= await userRepository.findOneOrFail(ID);
        user.PASSWORD= PASSWORD;
    }
    catch(e){
        return res.status(404).json({ status : "not found",code: "404", message: `user ${ID} not found`});
    }
   
   if(user.EMAIL!== EMAIL){
    return res.status(404).json({ status : "not found",code: "404", message: `Please set your email ..${EMAIL} incorrect`});
   }
    //try to save user
    try{
        user.hashPassword();
     await userRepository.save(user);
    }
    catch(e){
        res.status(409).json({status : "conflict",code: "409",message : `user ${EMAIL} alaready  in use`});
    }
    res.status(201).json({ status : "true",code: "201", message : `user with email ${EMAIL} update sussessfull password`});
     };

 static edit = async (req: Request, res: Response)=>{
    let user ;
    const{ID }= req.params;
    const {FIRSTNAME,EMAIL ,LASTNAME ,PASSWORD ,PHONE,ADRESS,UPDATED_AT}= req.body;
    const userRepository =getRepository(USER);
    
    //try get user
    try{
        user= await userRepository.findOneOrFail(ID);
        user.LASTNAME= LASTNAME;
       
        user.PASSWORD= PASSWORD;
        user.FIRSTNAME= FIRSTNAME;
        user.ADRESS= ADRESS;
       
        
        user.PHONE= PHONE;
        user.UPDATED_AT= UPDATED_AT;
    }
    catch(e){
        return res.status(404).json({ status : "not found",code: "404", message: `User ${ID} not found`});
    }
    
        if (user.ID == 1){
            return res.status(400).json({status : "bad request",code: "400",  message:`User with id ${ID} is CEO ADMIN `});
        }
        if(user.EMAIL!== EMAIL){
            return res.status(404).json({ status : "not found",code: "404", message: `Please set your email ..${EMAIL} incorrect`});
           }
    //try to save user
    try{
       
    
     await userRepository.save(user);
    }
    catch(e){
        res.status(409).json({status : "conflict",code: "409",message : `user ${EMAIL} alaready  in use`});
    }
    res.status(201).json({ status : "true",code: "201", message : `user with id ${ID} updated`});
     };
    }
export default ChangePassword;
