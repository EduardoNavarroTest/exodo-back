import CategoryDaoMongo from "../dao/Category/CategoryDaoMongo.js";
import CategoryDaoSQL from "../dao/Category/CategoryDaoSQL.js";
import CategoryDaoFile from "../dao/Category/CategoryDaoFile.js";
import 'dotenv/config';

class CategoryFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia CATEGORY: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new CategoryDaoMongo();
      case 'sql':
        return new CategoryDaoSQL();
      case 'FILE':
        return new CategoryDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default CategoryFactory;
