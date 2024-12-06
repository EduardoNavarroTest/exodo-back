import fs from 'fs/promises';
const path = './data/colors.json';

class ColorDaoMongo {
  async save(user) {
    const users = await this.findAll();
    users.push(user);
    await fs.writeFile(path, JSON.stringify(users, null, 2));
    return user;
  }

  async findAll() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
}

export default ColorDaoMongo;
