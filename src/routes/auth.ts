import {Router} from 'express';
import AuthController from '../controller/AuthController';
import ChangePassword from '../controller/ChangePassword';

const router = Router();

router.post('/login', AuthController.login);

router.post('/chpsw', ChangePassword.chPassword);



export default router;

