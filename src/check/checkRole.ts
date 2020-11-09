import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";
import config from "./config";
import * as jwt from "jsonwebtoken";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
 const token = <string>req.headers["token"];
 
   const jwtPayload = <any>jwt.verify(token,config.jwtSecret);
   
    const userRepository = getRepository(USER);
    let user: USER;
    try {
      user = await userRepository.findOneOrFail({where:{EMAIL: jwtPayload.EMAIL}});
    } catch (e) {
      console.log(token);
      res.status(401).send({message: 'user not have privilegies', success: false});
    }

    //Check if array of authorized roles includes the user's role
    if (roles.length && !roles.includes(user.ROLE)){
      console.log('not admin',token);
    res.status(401).send({message:`User ${user.EMAIL} not have privilegies`, success:false});
    }
    else { console.log('ok',token); next();}
  };
};