import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { user_table } from "../entity/user_table/user_table";


export class ChangePassword{

static chPassword = async (req: Request, res: Response) => {
   
    //Get ID from JWT
    const {ID}= req.params;
    


    //Get parameters from the body
    const { PASSWORD, newPassword } = req.body;
    if (!(PASSWORD && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(user_table);
    let user: user_table;
    try {
      user = await userRepository.findOneOrFail(ID);
    } catch (ID) {
      res.status(401).send();
    }

    //Check if old password matchs
    

    //Validate de model (password lenght)
    user.PASSWORD = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
   
    userRepository.save(user);

    res.status(204).send();
  };}
  export default ChangePassword;