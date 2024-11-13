import ProductService from '../services/ProductService.js';

const productService = new ProductService();

class ProductController {
    async createProduct(req, res) {
        const { barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status } = req.body;
        try {
            const product = await productService.createProduct(barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status);
            res.status(201).json(product);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(id);
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getProductByBarcode(req, res) {
        const { barcode } = req.params;
        try {
            const product = await productService.getProductByBarcode(barcode);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteProductById(req, res) {
        const { id } = req.params;
        try {
            const deletedProduct = await productService.deleteProductById(id);
            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProductById(req, res) {
        const { id } = req.params;
        const { newBarcode,  newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus } = req.body;
        try {
            const updatedProduct = await productService.updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ProductController;
