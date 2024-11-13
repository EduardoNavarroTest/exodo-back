import ProductDaoMongo from "../dao/Product/ProductDaoMongo.js";
import ProductDaoSQL from "../dao/Product/productDaoSQL.js";
import ProductDaoFile from "../dao/Product/ProductDaoFile.js";
import 'dotenv/config';

class ProductFactory {
  static getDao() {
    const persistence = process.env.PERSISTENCE; // 'mongo', 'sql' o 'file'
    console.log(`Persistencia: ${persistence}`);

    switch (persistence) {
      case 'mongo':
        return new ProductDaoMongo();
      case 'sql':
        return new ProductDaoSQL();
      case 'FILE':
        return new ProductDaoFile();
      default:
        throw new Error('Persistence type not specified');
    }
  }
}

export default ProductFactory;
