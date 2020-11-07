import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";
import config from "./config";
import * as jwt from "jsonwebtoken";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
 const token = <string>req.header["token"];
   const jwtPayload = <any>jwt.verify(token,config.jwtSecret);
   
    const userRepository = getRepository(USER);
    let user: USER;
    try {
      user = await userRepository.findOneOrFail({where:{EMAIL: jwtPayload.EMAIL}});
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles && roles.indexOf(user.ROLE) > -1) next();
    else res.status(401).send({roles: roles ,USER:user, role: user.ROLE});
  };
};