import express from 'express';
import SizeController from '../controllers/SizeController.js';

const router = express.Router();
const sizeController = new SizeController();

router.get('/', sizeController.getAllSizes); //Traer todos
router.get('/id/:id', sizeController.getSizeById); //Traer por id
router.get('/code/:code', sizeController.getSizeByCode); //Traer por code
router.post('/', sizeController.createSize); //Crear
router.put('/id/:id', sizeController.updateSizeById); //Actualizar
router.delete('/id/:id', sizeController.deleteSizeById); //Eliminar por id



export default router;
