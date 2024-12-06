import express from 'express';
import MaritalStatusController from '../controllers/MaritalStatusController.js';

const router = express.Router();
const maritalStatusController = new MaritalStatusController();

router.get('/', maritalStatusController.getAllMaritalStatus); //Traer todos
router.get('/id/:id', maritalStatusController.getMaritalStatusById); //Traer por id
router.get('/code/:code', maritalStatusController.getMaritalStatusByCode); //Traer por code
router.post('/', maritalStatusController.createMaritalStatus); //Crear
router.put('/id/:id', maritalStatusController.updateMaritalStatusById); //Actualizar
router.delete('/id/:id', maritalStatusController.deleteMaritalStatusById); //Eliminar por id



export default router;
