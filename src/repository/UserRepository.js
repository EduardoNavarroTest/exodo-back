import UserFactory from "../factory/UserFactory.js";

class UserRepository {
  constructor() {
    this.dao = UserFactory.getDao();
  }

  async save(user) {
    return await this.dao.save(user);
  }

  async findAll() {
    return await this.dao.findAll();
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async findByUser(user) {
    return await this.dao.findByUser(user);
  }

  async findByQuery(query) {
    return await this.dao.findByQuery(query);
  }

  async deleteUserById(id) {
    return await this.dao.deleteById(id);
  }

  async updateUserById(user) {
    return await this.dao.updateById(user);
  }
}

export default UserRepository;