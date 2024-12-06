import IdTypesFactory from "../factory/IdTypesFactory.js";

class IdTypesRepository {
  constructor() {
    this.dao = IdTypesFactory.getDao();
  }

  async save(idType) {
    return await this.dao.save(idType);
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

  async deleteIdTypesById(id) {
    return await this.dao.deleteById(id);
  }

  async updateIdTypesById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default IdTypesRepository;