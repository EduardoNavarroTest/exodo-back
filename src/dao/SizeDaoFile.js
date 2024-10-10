import fs from 'fs/promises';

const path = './src/data/sizes.json';

class SizeDaoFile {
    async save(size) {
        try {
            const sizes = await this.findAll();
            const lastId = await this.lastId();
            const newSize = { id: lastId + 1, ...size };
            sizes.push(newSize);
            await fs.writeFile(path, JSON.stringify(sizes, null, 2));
            return newSize;
        } catch (error) {
            console.error('Error saving size:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading sizes:', err);
            return [];
        }
    }


    async findByCode(code) {
        try {
            const sizes = await this.findAll();
            const size = sizes.find(size => size.code === code);
            return size;
        } catch (err) {
            console.log('Error finding size by code:', err);
            throw err;

        }
    }

    async deleteByCode(code) {
        try {
            const sizes = await this.findAll();
            const size = await this.findByCode(code);

            const index = sizes.findIndex(size => size.code === code);
            if (index !== -1) {
                sizes.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(sizes, null, 2));
                return size;
            }

        } catch (err) {
            console.log('Error deleting size by code:', err.message);
            throw new Error(err);
        }
    }

    async updateByCode(code, newCode, newName, newDescription, newStatus) {
        try {
            const sizes = await this.findAll();
            const index = sizes.findIndex(size => size.code === code);
            if (index !== -1) {
                sizes[index] = { id: sizes[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: sizes[index].user, date: sizes[index].date, userUpdate: sizes[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(sizes, null, 2));
                return sizes[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating size by code:', err.message);
            throw new Error(err);
        }
    }


    async lastId() {
        try {
            const sizes = await this.findAll();
            const lastId = sizes.length > 0 ? sizes[sizes.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default SizeDaoFile;
