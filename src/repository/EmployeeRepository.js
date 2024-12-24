import EmployeeFactory from "../factory/EmployeeFactory.js";

class EmployeeRepository {
  constructor() {
    this.dao = EmployeeFactory.getDao();
  }

  async save(employee) {
    return await this.dao.save(employee);
  }

  async findAll() {
    return await this.dao.findAll();
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async findByQuery(query) {
    return await this.dao.findByQuery(query);
  }

  async deleteEmployeeById(id) {
    return await this.dao.deleteById(id);
  }

  async updateEmployeeById(id) {
    return await this.dao.updateById(employee);
  }
}

export default EmployeeRepository;