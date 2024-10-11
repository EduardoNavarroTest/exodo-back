import express from 'express';
import SizeController from '../controllers/SizeController.js';

const router = express.Router();
const sizeController = new SizeController();

router.get('/', sizeController.getAllSizes); //Traer todos
router.get('/code/:code', sizeController.getSizeByCode); //Traer por id
router.post('/', sizeController.createSize); //Crear
router.put('/code/:code', sizeController.updateSizeByCode); //Actualizar
router.delete('/code/:code', sizeController.deleteSizeByCode); //Eliminar por id



export default router;
