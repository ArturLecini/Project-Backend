import {Router} from 'express';
import  {ButtonController}  from '../controller/buttonContrroler';

import {UserController} from '../controller/UserController';
import { checkJwt } from "../check/checkJWT";
import { checkRole } from "../check/checkRole";
import {USER} from "../entity/USER"

const router = Router();


//getb all users
router.get('/' ,UserController.getAll);//,[checkJwt][checkJwt, checkRole(["ADMIN"])]

//get one user only nr
router.get('/:ID([0-9]+)',UserController.getById);//[checkJwt, checkRole(["ADMIN"])],

//create new user
router.post('/add' ,UserController.newUser);//,[checkJwt],

//edit user
router.patch(`/edit/:ID([0-9]+)` , UserController.editUser);// ,[checkJwt],[checkJwt, checkRole(["ADMIN"])],
router.put('/edit/:ID', UserController.editUser);

//delete
router.delete('/delete/:ID',UserController.deleteUser);//[checkJwt, checkRole(["ADMIN"])],


export default router;