import MaritalStatusDaoMongo from "../dao/MaritalStatus/MaritalStatusDaoMongo.js";
import MaritalStatusDaoSQL from "../dao/MaritalStatus/MaritalStatusDaoSQL.js";
import MaritalStatusDaoFile from "../dao/MaritalStatus/MaritalStatusDaoFIle.js";
import 'dotenv/config';

class MaritalStatusFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia MARITAL STATUS: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new MaritalStatusDaoMongo();
      case 'sql':
        return new MaritalStatusDaoSQL();
      case 'FILE':
        return new MaritalStatusDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default MaritalStatusFactory;
