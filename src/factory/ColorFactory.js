import ColorDaoMongo from "../dao/Color/ColorDaoMongo.js";
import ColorDaoSQL from "../dao/Color/ColorDaoSQL.js";
import ColorDaoFile from "../dao/Color/ColorDaoFile.js";
import 'dotenv/config';

class ColorFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia COLOR: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new ColorDaoMongo();
      case 'sql':
        return new ColorDaoSQL();
      case 'FILE':
        return new ColorDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default ColorFactory;
