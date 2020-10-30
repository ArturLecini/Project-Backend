import {Router} from 'express';
import AuthController from '../controller/AuthController';
import ChangePassword from '../controller/ChangePassword';
import { checkJwt } from "../check/checkJWT";
const router = Router();

router.post('/login',AuthController.login);
router.patch('/change-password/:ID',ChangePassword.chPassword);//s




export default router;

