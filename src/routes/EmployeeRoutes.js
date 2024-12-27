import express from 'express';
import EmployeeController from '../controllers/EmployeeController.js';

const router = express.Router();
const employeeController = new EmployeeController();

router.get('/', employeeController.getAllEmployees); 
router.get('/id/:id', employeeController.getEmployeeById); 
router.get('/query/:query', employeeController.getEmployeeByQuery);
router.get('/code/:code', employeeController.getEmployeeByCode);
router.post('/', employeeController.createEmployee); 
router.put('/id/:id', employeeController.updateEmployeeById); 
router.delete('/id/:id', employeeController.deleteEmployeeById); 



export default router;