
import { validate} from 'class-validator';
import { Request ,Response} from 'express';
import {getRepository} from 'typeorm';
import { USER} from '../entity/USER';


export class RoleController {


 
static editRole = async (req: Request, res: Response)=>{
    let user ;
    const{ID}= req.params;
    const {ROLE ,UPDATED_AT}= req.body;
    const userRepository =getRepository(USER);
    
    //try get user
    try{
        user= await userRepository.findOneOrFail(ID);
       
        user.ROLE= ROLE;
        user.UPDATED_AT= UPDATED_AT;
    }
    catch(e){
        return res.status(404).json({ status : "not found",code: "404", message: `User ${ID} not found`});
    }
    
        if (user.ID == 1){
            return res.status(400).json({status : "bad request",code: "400",  message:`User with id ${ID} is CEO ADMIN `});
        }
    //try to save user
    try{
     await userRepository.save(user);
    }
    catch(e){
        res.status(409).json({status : "conflict",code: "409",message : `user ${ID} alaready  in use`});
    }
    res.status(201).json({ status : "true",code: "201", message : `user with id ${ID} updated`});
     };

static getRole = async(req: Request ,res: Response)=>{
    const {ID} = req.body;
    const {ROLE} = req.params;

        const userRepository = getRepository(USER);
        
        const user = await userRepository.find({ID});

        if(user.length > 0){
         return   res.status(226).send(user);
        }
        else {
            return res.status(404).json({ status : "not found",code: "204", message: ` Not found Users  in database`});
        }
    };
}
     export default RoleController;