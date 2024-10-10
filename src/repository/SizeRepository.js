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

  async findByCode(code) {
    return await this.dao.findByCode(code);
  }

  async deleteSizeByCode(code) {
    return await this.dao.deleteByCode(code);
  }

  async updateSizeByCode(code, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateByCode(code, newCode, newName, newDescription, newStatus);
  }
}

export default SizeRepository;