import ProductRepository from '../repository/ProudtRepository.js';
import ProductModel from '../models/ProductModel.js';
import ProductDTO from '../dto/ProductDTO.js';


class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status) {

        /**REEMPLAZAR POR EL BARCODE */
        const existingProduct = await this.productRepository.findByBarcode(barcode);
        if (existingProduct) {
            throw new Error('Product already exists with the same barcode');
        }

        const product = await new ProductModel({ barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status });
        const savedProduct = await this.productRepository.save(product);
        return await ProductDTO.fromModel(savedProduct);
    }

    async getAllProducts() {
        const products = await this.productRepository.findAll();
        if (!products) {
            throw new Error('Products not found');
        }
        return products.map(product => ProductDTO.fromModel(product));
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return ProductDTO.fromModel(product);
    }

    async getProductByBarcode(barcode) {
        const product = await this.productRepository.findByBarcode(barcode);
        if (!product) {
            throw new Error('Product not found');
        }
        return ProductDTO.fromModel(product);
    }

    async deleteProductById(id) {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const deletedProduct = await this.productRepository.deleteProductById(id);
        return ProductDTO.fromModel(deletedProduct);
    }

    async updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus) {

        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        const existingProduct = await this.productRepository.findByBarcode(newBarcode);
        if (existingProduct && newBarcode && newBarcode !== product.barcode) { /** Entra aquí si existe el producto, si el barcode trae información y no es el mismo */
            throw new Error('Barcode already exists');
        }

        const updatedProduct = await this.productRepository.updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus);
        return ProductDTO.fromModel(updatedProduct);
    }



}

export default ProductService;
