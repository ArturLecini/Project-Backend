import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";


export class ChangePassword{
  static chPassword = async (req: Request, res: Response) => {
    let user ;
    const{ID ,EMAIL}= req.params;
    const { PASSWORD }= req.body;
    const userRepository =getRepository(USER);
    //try get user
    try{
        user= await userRepository.findOneOrFail(ID);
        user= await userRepository.findOneOrFail(EMAIL);
        user.EMAIL = EMAIL;
        user.PASSWORD= PASSWORD;
    }
    catch(e){
        return res.status(404).json({ status : "not found",code: "404", message: `user ${ID} not found`});
    }
    
        
       
    //try to save user
    try{
     await userRepository.save(user);
    }
    catch(e){
        res.status(409).json({status : "conflict",code: "409",message : `user  alaready  in use`});
    }
    res.status(201).json({ status : "true",code: "201", message : `user with id ${ID} update sussessfull password`});
     };
    }
export default ChangePassword;
