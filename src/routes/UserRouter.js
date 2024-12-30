import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsers); 
router.get('/id/:id', userController.getUserById); 
router.get('/query/:query', userController.getUserByQuery);
router.get('/user/:user', userController.getUserByUser);
router.post('/', userController.createUser); 
router.put('/id/:id', userController.updateUserById); 
router.delete('/id/:id', userController.deleteUserById); 



export default router;