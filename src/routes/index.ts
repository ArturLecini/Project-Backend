import {Router} from 'express';
import auth from './auth';
import user from './user';
import {checkRole} from '../controller/checkRole'
const routes =Router();
routes.use('/auth' ,auth);
routes.use('/users',user);//, checkRole(["ADMIN"])



export default routes;