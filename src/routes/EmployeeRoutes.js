import express from 'express';
import passport from 'passport';
import EmployeeController from '../controllers/EmployeeController.js';

const router = express.Router();
const employeeController = new EmployeeController();

router.get('/', passport.authenticate('jwt', { session: false }), employeeController.getAllEmployees); 
router.get('/id/:id', passport.authenticate('jwt', { session: false }), employeeController.getEmployeeById); 
router.get('/query/:query', passport.authenticate('jwt', { session: false }), employeeController.getEmployeeByQuery);
router.get('/code/:code', passport.authenticate('jwt', { session: false }), employeeController.getEmployeeByCode);
router.post('/', passport.authenticate('jwt', { session: false }), employeeController.createEmployee); 
router.put('/id/:id', passport.authenticate('jwt', { session: false }), employeeController.updateEmployeeById); 
router.delete('/id/:id', passport.authenticate('jwt', { session: false }), employeeController.deleteEmployeeById); 




export default router;