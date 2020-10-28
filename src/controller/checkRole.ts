import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { user_table } from "../entity/user_table/user_table";



export const checkRole = (ROLE: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   
    const{ID}= req.params;
    //Get user role from the database
    const userRepository = getRepository(user_table);
    let user: user_table;
    try {
      user = await userRepository.findOneOrFail(ID);
    } catch (ID) {
      res.status(401).json({message: `User ${ID} not have privilegies `});
    }

    //Check if array of authorized roles includes the user's role
    if (ROLE.indexOf(user.ROLE) > -1) next();
    else res.status(401).json({message: `User ${ID} not have privilegies `});
  };
};


export default checkRole