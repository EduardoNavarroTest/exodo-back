import fs from 'fs/promises';

const path = './src/data/subcategories.json';

class SubcategoryDaoFile {
    async save(category) {
        try {
            const subcategories = await this.findAll();
            const lastId = await this.lastId();
            const newSubcategory = { id: lastId + 1, ...category };
            subcategories.push(newSubcategory);
            await fs.writeFile(path, JSON.stringify(subcategories, null, 2));
            return newSubcategory;
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
            console.error('Error reading subcategories:', err);
            return [];
        }
    }

    
    async findById(id) {
        try {
            const subcategories = await this.findAll();
            const category = subcategories.find(category => category.id == id);
            return category;
        } catch (err) {
            console.log('Error finding category by id:', err);
            throw err;

        }
    }

    async findByCode(code) {
        try {
            const subcategories = await this.findAll();
            const category = subcategories.find(category => category.code === code);
            return category;
        } catch (err) {
            console.log('Error finding category by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const subcategories = await this.findAll();
            const category = await this.findById(id);

            const index = subcategories.findIndex(category => category.id == id);
            if (index !== -1) {
                subcategories.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(subcategories, null, 2));
                return category;
            }

        } catch (err) {
            console.log('Error deleting category by id:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const subcategories = await this.findAll();
            const index = subcategories.findIndex(category => category.id == id);
            if (index !== -1) {
                subcategories[index] = { id: subcategories[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: subcategories[index].user, date: subcategories[index].date, userUpdate: subcategories[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(subcategories, null, 2));
                return subcategories[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating category by id:', err.message);
            throw new Error(err);
        }
    }


    async lastId() {
        try {
            const subcategories = await this.findAll();
            const lastId = subcategories.length > 0 ? subcategories[subcategories.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default SubcategoryDaoFile;
