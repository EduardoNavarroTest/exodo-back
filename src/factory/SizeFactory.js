import SizeDaoMongo from "../dao/Size/SizeDaoMongo.js";
import SizeDaoSQL from "../dao/Size/SizeDaoSQL.js";
import SizeDaoFile from "../dao/Size/SizeDaoFile.js";
import 'dotenv/config';

class SizeFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia SIZE: ${persistence}`);

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
