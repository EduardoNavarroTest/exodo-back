import IdTypesDaoMongo from "../dao/IdTypes/IdTypesDaoMongo.js";
import IdTypesDaoSQL from "../dao/IdTypes/IdTypesDaoSQL.js";
import IdTypesDaoFile from "../dao/IdTypes/IdTypesDaoFile.js";
import 'dotenv/config';

class IdTypesFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia ID TYPE: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new IdTypesDaoMongo();
      case 'sql':
        return new IdTypesDaoSQL();
      case 'FILE':
        return new IdTypesDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default IdTypesFactory;
