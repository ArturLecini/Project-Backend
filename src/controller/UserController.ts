import {IsDataURI, validate} from 'class-validator';
import {user_table} from '../entity/user_table/user_table'
import { Request ,Response} from 'express';
import {getRepository} from 'typeorm';



export class UserController {

    static getAll = async ( req: Request, res: Response)=>{
        const userRepository = getRepository(user_table);
        const user = await userRepository.find();

        if(user.length > 0){
            res.send(user);
        }else {
            res.status(404).json({message: 'No users in database '});
        }
    };

    static getById= async (req: Request , res: Response)=>{
        const {ID}= req.params;
    const userRepository =getRepository(user_table);

try
{
    const user = await  userRepository.findOneOrFail(ID);
    res.send(user);
   } 
   catch(e) 
{
    res.status(404).json({message: 'This ID not found'});
   } 
 };
 static newUser = async(req: Request ,res: Response)=>{
     const {   FIRSTNAME, LASTNAME, EMAIL , PASSWORD , PHONE , ADRESS,ID,ROLE,CREATED} = req.body
     const user= new user_table();
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
     const errors = await validate(user);
if(errors.length>0){
    return res.status(400).json(errors)
}

//hash passsword
const userRepository = getRepository(user_table)
try{
    await userRepository.save(user);
}
catch(e){
    return res.status(409).json({ messages: "username xist" })
   }

   //all ok
   res.send('user created');
 };
 
 static editUser = async (req: Request, res: Response)=>{
let user ;
const{ID}= req.params;
const {FIRSTNAME, ROLE}= req.body;
const userRepository =getRepository(user_table);

//try get user
try{
    user= await userRepository.findOneOrFail(ID);

user.FIRSTNAME= FIRSTNAME;
user.ROLE= ROLE;
}
catch(e){
    return res.status(404).json({message: 'User not found'});
}


const errors = await validate(user);
if(errors.length > 0){
    return res.status(400).json(errors);
}
//try to save user
try{
 await userRepository.save(user);
}
catch(e){
    return res.status(401).json({message : 'user alaready  in use'});
}
res.status(201).json({message : 'user updated'});
 };

 static deleteUser = async (req: Request, res: Response)=>{
     const {ID} = req.params;
     const userRepository = getRepository(user_table);
     let user: user_table;
     try{
         user = await userRepository.findOneOrFail(ID);

     }
     catch(e){
         return res.status(404).json({message: 'user not found'});

     }
     //remove user 

     userRepository.delete(ID);
     res.status(201).json({message:' user deleted'});
 };
}
 export default UserController;