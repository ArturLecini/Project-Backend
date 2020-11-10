import {Router} from 'express';
import  {ButtonController}  from '../controller/buttonContrroler';

import {UserController} from '../controller/UserController';
import { checkJwt } from "../check/checkJWT";
import { checkRole } from "../check/checkRole";
import {USER} from "../entity/USER"

const router = Router();


//getb all users
router.get('/',[checkJwt,checkRole(["admin"])]
 ,UserController.getAll);//,,checkRole(["ADMIN"]),[checkJwt, ][checkJwt],[checkJwt, ,[checkJwt, checkRole(["admin"])]checkRole(["ADMIN"])]

//get one user only nr
router.get('/:ID([0-9]+)',[checkJwt,checkRole(["admin"])],UserController.getById);//[checkJwt],

//create new user

router.post('/add' ,[checkJwt,checkRole(["admin"])],UserController.newUser);//,
//edit user
router.patch(`/edit/:ID([0-9]+)` ,[checkJwt,checkRole(["admin"])], UserController.editUser);// ,[checkJwt]


//delete
router.delete('/delete/:ID',UserController.deleteUser);


export default router;