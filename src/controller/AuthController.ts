import {getRepository } from 'typeorm';
import {Request ,Response} from 'express';
import {user_table} from '../entity/user_table/user_table';

class AuthController {

    static login = async (req: Request, res : Response)=>{
        const{EMAIL , PASSWORD} = req.body;
            if(!(EMAIL&&PASSWORD))
            {
            return res.status(400).json({message:'username & passwrd are required!'});
         }
        const userReposity =getRepository(user_table);
        let user: user_table;
        try {
            user = await userReposity.findOneOrFail({where:{EMAIL}});
        }catch(e){
            return res.status(400).json({message: 'Username or password incorect !'});
        }
        res.send(user);
    };
}
export default AuthController;