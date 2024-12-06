import express from 'express';
import IdTypesController from '../controllers/IdTypesController.js';

const router = express.Router();
const idTypesController = new IdTypesController();

router.get('/', idTypesController.getAllIdTypes); //Traer todos
router.get('/id/:id', idTypesController.getIdTypesById); //Traer por id
router.get('/code/:code', idTypesController.getIdTypesByCode); //Traer por code
router.post('/', idTypesController.createIdTypes); //Crear
router.put('/id/:id', idTypesController.updateIdTypesById); //Actualizar
router.delete('/id/:id', idTypesController.deleteIdTypesById); //Eliminar por id



export default router;
