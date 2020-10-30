import {Router} from 'express';
import  {ButtonController}  from '../controller/buttonContrroler';

import {UserController} from '../controller/UserController';
import { checkJwt } from "../check/checkJWT";
import { checkRole } from "../check/checkRole";


const router = Router();


//getb all users
router.get('/', UserController.getAll);//checkRole(["ADMIN"]),

//get one user only nr
router.get('/:ID([0-9]+)',UserController.getById);//[checkJwt, checkRole(["ADMIN"])],

//create new user
router.post('/add',UserController.newUser);

//edit user
router.patch('/edit/:ID([0-9]+)', UserController.editUser);//[checkJwt, checkRole(["ADMIN"])],
router.put('/:ID', UserController.editUser);

//delete
router.delete('/delete/:ID',UserController.deleteUser);//[checkJwt, checkRole(["ADMIN"])],


export default router;