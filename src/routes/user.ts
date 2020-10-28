import {Router} from 'express';
import {UserController} from '../controller/UserController';
const router = Router();


//getb all users
router.get('/', UserController.getAll);


//get one user
router.get('/:ID',UserController.getById);

//create new user
router.post('/',UserController.newUser);

//edit user
router.patch('/:ID', UserController.editUser);


//delete
router.delete('/:ID',UserController.deleteUser);




export default router;