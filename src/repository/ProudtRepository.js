import ProductFactory from "../factory/ProductFactory.js";

class ProductRepository {
  constructor() {
    this.dao = ProductFactory.getDao();
  }

  async save(product) {
    return await this.dao.save(product);
  }

  async findAll() {
    return await this.dao.findAll();
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async findByBarcode(barcode) {
    return await this.dao.findByBarcode(barcode);
  }

  async deleteProductById(id) {
    return await this.dao.deleteById(id);
  }

  async updateProductById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus) {
    return await this.dao.updateById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus);
  }
}

export default ProductRepository;