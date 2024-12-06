import express from 'express';
import ColorController from '../controllers/ColorController.js';

const router = express.Router();
const colorController = new ColorController();

router.get('/', colorController.getAllColors); //Traer todos
router.get('/id/:id', colorController.getColorById); //Traer por id
router.get('/code/:code', colorController.getColorByCode); //Traer por code
router.post('/', colorController.createColor); //Crear
router.put('/id/:id', colorController.updateColorById); //Actualizar
router.delete('/id/:id', colorController.deleteColorById); //Eliminar por id



export default router;
