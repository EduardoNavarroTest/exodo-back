import SubcategoryDaoMongo from "../dao/Subcategory/SubcategoryDaoMongo.js";
import SubcategoryDaoSQL from "../dao/Subcategory/SubcategoryDaoSQL.js";
import SubcategoryDaoFile from "../dao/Subcategory/SubcategoryDaoFile.js";
import 'dotenv/config';

class SubcategoryFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia SUBCATEGORY: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new SubcategoryDaoMongo();
      case 'sql':
        return new SubcategoryDaoSQL();
      case 'FILE':
        return new SubcategoryDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default SubcategoryFactory;
