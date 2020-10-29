import {getRepository } from 'typeorm';
import {Request ,Response} from 'express';
import {USER} from '../entity/USER';

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
        }
         res.send(user);
    };
}
export default AuthController;