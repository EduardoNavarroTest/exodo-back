import SubcategoryFactory from "../factory/SubcategoryFactory.js";

class SubcategoryRepository {
  constructor() {
    this.dao = SubcategoryFactory.getDao();
  }


  async save(subcategory) {
    return await this.dao.save(subcategory);
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

  async deleteSubcategoryById(id) {
    return await this.dao.deleteById(id);
  }

  async updateSubcategoryById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default SubcategoryRepository;