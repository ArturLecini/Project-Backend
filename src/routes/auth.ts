import {Router} from 'express';
import AuthController from '../controller/AuthController';
import ChangePassword from '../controller/ChangePassword';
import { checkJwt } from "../check/checkJWT";
const router = Router();

router.post('/login', AuthController.login);
router.put('/:ID', [checkJwt],ChangePassword.chPassword);




export default router;

