import MaritalStatusFactory from "../factory/MaritalStatusFactory.js";

class MaritalStatusRepository {
  constructor() {
    this.dao = MaritalStatusFactory.getDao();
  }

  async save(maritalStatus) {
    return await this.dao.save(maritalStatus);
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

  async deleteMaritalStatusById(id) {
    return await this.dao.deleteById(id);
  }

  async updateMaritalStatusById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default MaritalStatusRepository;