import {Router} from 'express';
import auth from './auth';
import user from './user';
import admin from './admin'
import {checkRole} from '../check/checkRole'
import router from './auth';
const routes =Router();
routes.use('/' ,auth);
routes.use('/users',user);//, checkRole(["ADMIN"])
routes.use('/admin',admin);
export default routes;