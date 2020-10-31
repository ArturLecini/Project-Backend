import {Router} from 'express';
import AuthController from '../controller/AuthController';
import ChangePassword from '../controller/ChangePassword';
import { checkJwt } from "../check/checkJWT";
const router = Router();

router.post('/login',AuthController.login);//,[checkJwt]
router.patch('/change-password/:EMAIL',ChangePassword.chPassword);//s




export default router;

