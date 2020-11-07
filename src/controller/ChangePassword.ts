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
    }
export default ChangePassword;
