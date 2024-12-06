import GenderDaoMongo from "../dao/Gender/GenderDaoMongo.js";
import GenderDaoSQL from "../dao/Gender/GenderDaoSQL.js";
import GenderDaoFile from "../dao/Gender/GenderDaoFile.js";
import 'dotenv/config';

class GenderFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia GENDER: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new GenderDaoMongo();
      case 'sql':
        return new GenderDaoSQL();
      case 'FILE':
        return new GenderDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default GenderFactory;
