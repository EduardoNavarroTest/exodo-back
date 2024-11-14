import CategoryFactory from "../factory/CategoryFactory.js";

class CategoryRepository {
  constructor() {
    this.dao = CategoryFactory.getDao();
  }


  async save(category) {
    return await this.dao.save(category);
  }

  async findAll() {
    return await this.dao.findAll();
  }


  async findById(id) {
    return await this.dao.findById(id);
  }

  async findByCode(code) {
    return await this.dao.findByCode(code);
  }

  async deleteCategoryById(id) {
    return await this.dao.deleteById(id);
  }

  async updateCategoryById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default CategoryRepository;