import SizeDaoMongo from "../dao/SizeDaoMongo.js";
import SizeDaoSQL from "../dao/SizeDaoSQL.js";
import SizeDaoFile from "../dao/SizeDaoFile.js";
import 'dotenv/config';

class SizeFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new SizeDaoMongo();
      case 'sql':
        return new SizeDaoSQL();
      case 'FILE':
        return new SizeDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default SizeFactory;
