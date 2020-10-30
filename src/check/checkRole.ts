import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";

export const checkRole = (ROLE: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   
    const{ID}= req.params;
    //Get user role from the database
    const userRepository = getRepository(USER);
    let user: USER;//res.locals.jwtPayload.ID;
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