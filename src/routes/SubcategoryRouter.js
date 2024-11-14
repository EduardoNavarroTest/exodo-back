import express from 'express';
import SubcategoryController from '../controllers/SubcategoryController.js';

const router = express.Router();
const subcategoryController = new SubcategoryController();

router.get('/', subcategoryController.getAllSubcategories); //Traer todos
router.get('/id/:id', subcategoryController.getSubcategoryById); //Traer por id
router.get('/code/:code', subcategoryController.getSubcategoryByCode); //Traer por code
router.post('/', subcategoryController.createSubcategory); //Crear
router.put('/id/:id', subcategoryController.updateSubcategoryById); //Actualizar
router.delete('/id/:id', subcategoryController.deleteSubcategoryById); //Eliminar por id



export default router;
