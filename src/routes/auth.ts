import {Router} from 'express';
import AuthController from '../controller/AuthController';
import ChangePassword from '../controller/ChangePassword';
import { checkJwt } from "../check/checkJWT";
import { checkRole} from "../check/checkRole";
const router = Router();

router.post('/login' ,AuthController.login);
router.patch('/change-password/:ID',ChangePassword.chPassword);
router.post('/signup' ,AuthController.signup);
router.put('/edit/:ID', ChangePassword.edit);


export default router;

