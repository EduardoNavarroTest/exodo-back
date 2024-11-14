import fs from 'fs/promises';

const path = './src/data/products.json';

class ProductDaoFile {
    async save(product) {
        try {
            const products = await this.findAll();
            const lastId = await this.lastId();
            const newProduct = { id: lastId + 1, ...product };
            products.push(newProduct);
            await fs.writeFile(path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading products:', err);
            return [];
        }
    }


    async findById(id) {
        try {
            const products = await this.findAll();
            const product = products.find(product => product.id == id); //El id es numerico
            return product;
        } catch (err) {
            console.log('Error finding product by id:', err);
            throw err;

        }
    }
    

    async findByBarcode(barcode) {
        try {
            const products = await this.findAll();
            const product = products.find(product => product.barcode == barcode);
            return product;
        } catch (err) {
            console.log('Error finding product by barcode:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const products = await this.findAll();
            const product = await this.findById(id);

            const index = products.findIndex(product => product.id == id);
            if (index !== -1) {
                products.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(products, null, 2));
                return product;
            }

        } catch (err) {
            console.log('Error deleting product by id:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newBarcode, newName, newDescription, newCategoryId, newSubCategoryId, newSizeId, newColorId, newPrice, newStock, newIva, newImage, newStatus) {
        try {
            const products = await this.findAll();
            const index = products.findIndex(product => product.id == id);
            if (index !== -1) {
                products[index] = { id: products[index].id, barcode: newBarcode, name: newName, description: newDescription, categoryId: newCategoryId, subcategoryId: newSubCategoryId, sizeId: newSizeId, colorId: newColorId, price: newPrice, stock: newStock, image: newImage, iva: newIva, status: newStatus, user: products[index].user, date: products[index].date, userUpdate: products[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(products, null, 2));
                return products[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating product by id:', err.message);
            throw new Error(err);
        }
    }


    async lastId() {
        try {
            const products = await this.findAll();
            const lastId = products.length > 0 ? products[products.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default ProductDaoFile;
