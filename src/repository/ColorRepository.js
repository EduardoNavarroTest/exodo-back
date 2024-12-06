import ColorFactory from "../factory/ColorFactory.js";

class ColorRepository {
  constructor() {
    this.dao = ColorFactory.getDao();
  }

  async save(color) {
    return await this.dao.save(color);
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

  async deleteColorById(id) {
    return await this.dao.deleteById(id);
  }

  async updateColorById(id, newCode, newName, newDescription, newStatus) {
    return await this.dao.updateById(id, newCode, newName, newDescription, newStatus);
  }
}

export default ColorRepository;