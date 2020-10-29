import {Router} from 'express';
import auth from './auth';
import user from './user';
import {checkRole} from '../check/checkRole'
import router from './auth';
const routes =Router();
routes.use('/auth' ,auth);
routes.use('/users',user);//, checkRole(["ADMIN"])
router.use('/change',auth);

export default routes;