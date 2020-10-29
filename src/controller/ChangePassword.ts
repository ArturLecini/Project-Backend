import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { USER } from "../entity/USER";


export class ChangePassword{
  static chPassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const PASSWORD= res.locals.jwtPayload.user.PASSWORD;

    //Get parameters from the body
    const {ID} = req.params
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }
    //Get user from the database
    const userRepository = getRepository(USER);
    let user: USER;
    try {
      user = await userRepository.findOneOrFail(ID);
    } catch (ID) {
      res.status(401).send();
    }
    //Validate de model (password lenght)
    user.PASSWORD = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    //user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default ChangePassword;