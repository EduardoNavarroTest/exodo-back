import fs from 'fs/promises';

const path = './src/data/colors.json';

class ColorDaoFile {
    async save(color) {
        try {
            const colors = await this.findAll();
            const lastId = await this.lastId();
            const newColor = { id: lastId + 1, ...color };
            colors.push(newColor);
            await fs.writeFile(path, JSON.stringify(colors, null, 2));
            return newColor;
        } catch (error) {
            console.error('Error saving color:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading colors:', err);
            return [];
        }
    }


    
    async findById(id) {
        try {
            const colors = await this.findAll();
            const color = colors.find(color => color.id == id);
            return color;
        } catch (err) {
            console.log('Error finding color by id:', err);
            throw err;

        }
    }
    

    async findByCode(code) {
        try {
            const colors = await this.findAll();
            const color = colors.find(color => color.code === code);
            return color;
        } catch (err) {
            console.log('Error finding color by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const colors = await this.findAll();
            const color = await this.findById(id);

            const index = colors.findIndex(color => color.id == id);
            if (index !== -1) {
                colors.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(colors, null, 2));
                return color;
            }

        } catch (err) {
            console.log('Error deleting color by code:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const colors = await this.findAll();
            const index = colors.findIndex(color => color.id == id);
            if (index !== -1) {
                colors[index] = { id: colors[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: colors[index].user, date: colors[index].date, userUpdate: colors[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(colors, null, 2));
                return colors[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating color by code:', err.message);
            throw new Error(err);
        }
    }

    async findAllByStatus(status) {
        try {
            const colors = await this.findAll();
            return colors.filter(color => color.status === status);
        } catch (err) {
            console.log('Error finding colors by status:', err);
            throw err;
        }
    }

    async findByCodeStatus(code, status) {
        try {
            const colors = await this.findAll();
            return colors.find(color => color.code === code && color.status === status);
        } catch (err) {
            console.error('Error reading categories:', err);
            return [];
        }
    }

    async findByIdStatus(id, status) {
        try {
            const colors = await this.findAll();
            return colors.find(color => color.id == id && color.status === status);
        } catch (err) {
            console.log('Error finding color by id and status:', err);
            throw err;
        }
    }


    async lastId() {
        try {
            const colors = await this.findAll();
            const lastId = colors.length > 0 ? colors[colors.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default ColorDaoFile;
