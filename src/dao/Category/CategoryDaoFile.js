import fs from 'fs/promises';

const path = './src/data/categories.json';

class CategoryDaoFile {
    async save(category) {
        try {
            const categories = await this.findAll();
            const lastId = await this.lastId();
            const newCategory = { id: lastId + 1, ...category };
            categories.push(newCategory);
            await fs.writeFile(path, JSON.stringify(categories, null, 2));
            return newCategory;
        } catch (error) {
            console.error('Error saving category:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading categories:', err);
            return [];
        }
    }

    
    async findById(id) {
        try {
            const categories = await this.findAll();
            const category = categories.find(category => category.id == id);
            return category;
        } catch (err) {
            console.log('Error finding category by id:', err);
            throw err;

        }
    }

    async findByCode(code) {
        try {
            const categories = await this.findAll();
            const category = categories.find(category => category.code === code);
            return category;
        } catch (err) {
            console.log('Error finding category by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const categories = await this.findAll();
            const category = await this.findById(id);

            const index = categories.findIndex(category => category.id == id);
            if (index !== -1) {
                categories.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(categories, null, 2));
                return category;
            }

        } catch (err) {
            console.log('Error deleting category by id:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const categories = await this.findAll();
            const index = categories.findIndex(category => category.id == id);
            if (index !== -1) {
                categories[index] = { id: categories[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: categories[index].user, date: categories[index].date, userUpdate: categories[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(categories, null, 2));
                return categories[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating category by id:', err.message);
            throw new Error(err);
        }
    }


    async lastId() {
        try {
            const categories = await this.findAll();
            const lastId = categories.length > 0 ? categories[categories.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default CategoryDaoFile;
