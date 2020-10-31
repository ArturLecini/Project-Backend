import {Router} from 'express';
import  {ButtonController}  from '../controller/buttonContrroler';

import {UserController} from '../controller/UserController';
import { checkJwt } from "../check/checkJWT";
import { checkRole } from "../check/checkRole";


const router = Router();


//getb all users
router.get('/',[checkJwt] ,UserController.getAll);//checkRole(["ADMIN"]),

//get one user only nr
router.get('/:ID([0-9]+)',[checkJwt, checkRole(["ADMIN"])]
,UserController.getById);//[checkJwt, checkRole(["ADMIN"])],

//create new user
router.post('/add',[checkJwt] ,UserController.newUser);//

//edit user
router.patch('/edit/:ID([0-9]+)',[checkJwt],  UserController.editUser);// [checkJwt, checkRole(["ADMIN"])],
router.put('/edit/:ID', UserController.editUser);

//delete
router.delete('/delete/:ID',UserController.deleteUser);//[checkJwt, checkRole(["ADMIN"])],


export default router;