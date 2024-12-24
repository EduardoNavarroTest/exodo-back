import ProductRepository from '../repository/ProductRepository.js';
import ProductModel from '../models/ProductModel.js';
import ProductDTO from '../dto/ProductDTO.js';
import SubcategoryRepository from '../repository/SubcategoryRepository.js';
import CategoryRepository from '../repository/CategoryRepository.js';
import SizeRepository from '../repository/SizeRepository.js';
import ColorRepository from '../repository/ColorRepository.js';


class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
        this.subcategoryRepository = new SubcategoryRepository();
        this.categoryRepository = new CategoryRepository();
        this.sizeRepository = new SizeRepository();
        this.colorRepository = new ColorRepository();
    }

    async createProduct(barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status) {

        //Validaciones de las llaves foraneas.
        await this.validateCategory(categoryId);
        await this.validateSubcategory(subcategoryId);
        await this.validateSize(sizeId);
        await this.validateColor(colorId);

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

    async updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubcategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus) {

        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        //Validaciones de las llaves foraneas.
        await this.validateCategory(newCategoryId);
        await this.validateSubcategory(newSubcategoryId);
        await this.validateSize(newSizeId);
        await this.validateColor(newColorId);

        const existingProduct = await this.productRepository.findByBarcode(newBarcode);
        if (existingProduct && newBarcode && newBarcode !== product.barcode) { /** Entra aquí si existe el producto, si el barcode trae información y no es el mismo */
            throw new Error('Barcode already exists');
        }

        const updatedProduct = await this.productRepository.updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubcategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus);
        return ProductDTO.fromModel(updatedProduct);
    }

    async validateCategory(categoryId) {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category || !category.status) {
            throw new Error('Category not valid or disabled');
        }
    }

    async validateSubcategory(subcategoryId) {
        const subcategory = await this.subcategoryRepository.findById(subcategoryId);
        if (!subcategory || !subcategory.status) {
            throw new Error('Subcategory not valid or disabled');
        }
    }

    async validateSize(sizeId) {
        const size = await this.sizeRepository.findById(sizeId);
        if (!size || !size.status) {
            throw new Error('Size not valid or disabled');
        }
    }

    async validateColor(colorId) {
        const color = await this.colorRepository.findById(colorId);
        if (!color || !color.status) {
            throw new Error('Color not valid or disabled');
        }
    }

}

export default ProductService;
