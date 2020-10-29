import {Router} from 'express';
import auth from './auth';
import user from './user';
import {checkRole} from '../check/checkRole'
import router from './auth';
const routes =Router();
routes.use('/auth' ,auth);
routes.use('/users',user);//, checkRole(["ADMIN"])
routes.use('/change',auth);
routes.use('/button',user);
export default routes;