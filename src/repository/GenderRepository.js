import GenderFactory from "../factory/GenderFactory.js";

class GenderRepository {
  constructor() {
    this.dao = GenderFactory.getDao();
  }

  async save(gender) {
    return await this.dao.save(gender);
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

  async deleteGenderById(id) {
    return await this.dao.deleteById(id);
  }

  async updateGenderById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default GenderRepository;