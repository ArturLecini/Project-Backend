import {Router} from 'express';
import  {ButtonController}  from '../controller/buttonContrroler';

import {RoleController} from '../controller/RoleController';
import { checkJwt } from "../check/checkJWT";
import { checkRole } from "../check/checkRole";


const router = Router();

//role
router.patch('/role/:ID',RoleController.editRole);
router.get('/role',RoleController.getRole);

//buton
router.patch('/activate/:ID([0-9]+)',ButtonController.editbutton);//[checkJwt, checkRole(["ADMIN"])],
router.post('/activate',ButtonController.newbutton);


export default router;