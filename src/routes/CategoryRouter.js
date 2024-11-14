import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const router = express.Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories); //Traer todos
router.get('/id/:id', categoryController.getCategoryById); //Traer por id
router.get('/code/:code', categoryController.getCategoryByCode); //Traer por code
router.post('/', categoryController.createCategory); //Crear
router.put('/id/:id', categoryController.updateCategoryById); //Actualizar
router.delete('/id/:id', categoryController.deleteCategoryById); //Eliminar por id



export default router;
