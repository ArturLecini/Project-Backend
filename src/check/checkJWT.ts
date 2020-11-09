import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "./config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
 
  const token = <string>req.headers["token"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } 
  catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log('not valid',token);
    res.status(401).send();
    return;
  }
  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { EMAIL, PASSWORD ,ID} = jwtPayload;
  const newToken = jwt.sign({  EMAIL, PASSWORD,ID}, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

 
  next();
};