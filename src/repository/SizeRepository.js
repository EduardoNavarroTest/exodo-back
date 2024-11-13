import SizeFactory from "../factory/SizeFactory.js";

class SizeRepository {
  constructor() {
    this.dao = SizeFactory.getDao();
  }


  async save(size) {
    return await this.dao.save(size);
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

  async deleteSizeById(id) {
    return await this.dao.deleteById(id);
  }

  async updateSizeById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default SizeRepository;