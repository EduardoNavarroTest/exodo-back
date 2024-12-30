import UserDaoMongo from "../dao/User/UserDaoMongo.js";
import UserDaoSQL from "../dao/User/UserDaoSQL.js";
import UserDaoFile from "../dao/User/UserDaoFile.js";
import 'dotenv/config';

class UserFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia USER: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new UserDaoMongo();
      case 'sql':
        return new UserDaoSQL();
      case 'FILE':
        return new UserDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default UserFactory;
