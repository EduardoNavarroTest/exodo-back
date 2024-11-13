import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts); 
router.get('/id/:id', productController.getProductById); 
router.get('/barcode/:barcode', productController.getProductByBarcode);
router.post('/', productController.createProduct); 
router.put('/id/:id', productController.updateProductById); 
router.delete('/id/:id', productController.deleteProductById); 



export default router;
