import EmployeeDaoMongo from "../dao/Employee/EmployeeDaoMongo.js";
import EmployeeDaoSQL from "../dao/Employee/employeeDaoSQL.js";
import EmployeeDaoFile from "../dao/Employee/EmployeeDaoFile.js";
import 'dotenv/config';

class EmployeeFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia EMPLOYEE: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new EmployeeDaoMongo();
      case 'sql':
        return new EmployeeDaoSQL();
      case 'FILE':
        return new EmployeeDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default EmployeeFactory;
