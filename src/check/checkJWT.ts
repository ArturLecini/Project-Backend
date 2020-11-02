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
  catch (e) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send().json({ status : "unauthorized",code: "401",  message:`token is not valid, `});
    return;
  }
  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { EMAIL, PASSWORD ,ID} = jwtPayload;
  const newToken = jwt.sign({  EMAIL, PASSWORD,ID}, config.jwtSecret, {
    expiresIn: "2h"
  });
  res.cookie("SESSIONID", jwtPayload, {httpOnly:true, secure:true});
  res.setHeader("token", newToken);
  next();
};