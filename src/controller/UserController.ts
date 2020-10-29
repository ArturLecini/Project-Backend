import { validate} from 'class-validator';
import {USER} from '../entity/USER'
import { Request ,Response} from 'express';
import {getRepository} from 'typeorm';



export class UserController {

    static getAll = async ( req: Request, res: Response)=>{
        const userRepository = getRepository(USER);
        const user = await userRepository.find();

        if(user.length > 0){
         return   res.status(226).send(user);
        }
        else {
            return res.status(404).json({ status : "not found",code: "204", message: ` Not found Users  in database`});
        }
    };
   
    
    static getById= async (req: Request , res: Response)=>{
        const {ID}= req.params;
    const userRepository =getRepository(USER);

try
       { 
   const user = await  userRepository.findOneOrFail(ID);
    res.status(226).send(user);
   } 
   catch(e) 
        {
    return res.status(404).json({ status : "not found",code: "404", message: `User with id ${ID} not found`});
   } 
 };
 
 static editUser = async (req: Request, res: Response)=>{
let user ;
const{ID}= req.params;
const {FIRSTNAME, ROLE ,LASTNAME ,EMAIL,PASSWORD ,PHONE,ADRESS,UPDATED_AT}= req.body;
const userRepository =getRepository(USER);

//try get user
try{
    user= await userRepository.findOneOrFail(ID);
    user.LASTTNAME= LASTNAME;
    user.EMAIL= EMAIL;
    user.PASSWORD= PASSWORD;
    user.FIRSTNAME= FIRSTNAME;
    user.ADRESS= ADRESS;
    user.FIRSTNAME= FIRSTNAME;
    user.ROLE= ROLE;
    user.PHONE= PHONE;
}
catch(e){
    return res.status(404).json({ status : "not found",code: "404", message: `User ${ID} not found`});
}
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
    if (user.ID == 1){
        return res.status(400).json({status : "bad request",code: "400",  message:`User with id ${ID} is CEO ADMIN `});
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

 static deleteUser = async (req: Request, res: Response)=>{
     let user;
    const {ID} = req.params;
     const {ROLE} = req.body;
     const userRepository = getRepository(USER);
    
      try{
         user = await userRepository.findOneOrFail(ID); 
         user.ROLE= ROLE;
     }
     catch(e){
         return res.status(404).json({ status : "not found", code: "404", message: `User with id ${ID} not found`});
     }
     if (user.ID == 1){
        return res.status(400).json({status : "bad request",code: "400",  message:`User with id ${ID} is CEO ADMIN `});
    }
   try{
       await userRepository.delete(ID);
       }
       catch(e){
           return res.status(409).json({message : 'user alaready  in use'});
       }
     //remove user 
        res.status(200).json({  status : "deleted",code: "200",message:` user ${ID} deleted`});
 };

 static newUser = async(req: Request ,res: Response)=>{
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

user.hashPassword();
const userRepository = getRepository(USER);

try{ 
    
    await userRepository.save(user);
} catch (e) {
       res.status(409).json({status : "conflict",code: "409",message : `user ${EMAIL} alaready  in use`});
       return;
   }

   //If all ok, send 201 response
   res.status(201).json({ status : "true",code: "201", message : `user Created successfully`});
};


}
 export default UserController;