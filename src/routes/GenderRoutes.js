import express from 'express';
import GenderController from '../controllers/GenderController.js';

const router = express.Router();
const genderController = new GenderController();

router.get('/', genderController.getAllGenders); //Traer todos
router.get('/id/:id', genderController.getGenderById); //Traer por id
router.get('/code/:code', genderController.getGenderByCode); //Traer por code
router.post('/', genderController.createGender); //Crear
router.put('/id/:id', genderController.updateGenderById); //Actualizar
router.delete('/id/:id', genderController.deleteGenderById); //Eliminar por id



export default router;
