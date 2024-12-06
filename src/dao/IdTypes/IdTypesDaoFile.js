import fs from 'fs/promises';

const path = './src/data/idTypes.json';

class IdTypesDaoFile {
    async save(idType) {
        try {
            const idTypes = await this.findAll();
            const lastId = await this.lastId();
            const newIdTypes = { id: lastId + 1, ...idType };
            idTypes.push(newIdTypes);
            await fs.writeFile(path, JSON.stringify(idTypes, null, 2));
            return newIdTypes;
        } catch (error) {
            console.error('Error saving idType:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading idTypes:', err);
            return [];
        }
    }


    
    async findById(id) {
        try {
            const idTypes = await this.findAll();
            const idType = idTypes.find(idType => idType.id == id);
            return idType;
        } catch (err) {
            console.log('Error finding idType by id:', err);
            throw err;

        }
    }
    

    async findByCode(code) {
        try {
            const idTypes = await this.findAll();
            const idType = idTypes.find(idType => idType.code === code);
            return idType;
        } catch (err) {
            console.log('Error finding idType by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const idTypes = await this.findAll();
            const idType = await this.findById(id);

            const index = idTypes.findIndex(idType => idType.id == id);
            if (index !== -1) {
                idTypes.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(idTypes, null, 2));
                return idType;
            }

        } catch (err) {
            console.log('Error deleting idType by code:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const idTypes = await this.findAll();
            const index = idTypes.findIndex(idType => idType.id == id);
            if (index !== -1) {
                idTypes[index] = { id: idTypes[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: idTypes[index].user, date: idTypes[index].date, userUpdate: idTypes[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(idTypes, null, 2));
                return idTypes[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating idType by code:', err.message);
            throw new Error(err);
        }
    }

    async findAllByStatus(status) {
        try {
            const idTypes = await this.findAll();
            return idTypes.filter(idType => idType.status === status);
        } catch (err) {
            console.log('Error finding idTypes by status:', err);
            throw err;
        }
    }

    async findByCodeStatus(code, status) {
        try {
            const idTypes = await this.findAll();
            return idTypes.find(idType => idType.code === code && idType.status === status);
        } catch (err) {
            console.error('Error reading categories:', err);
            return [];
        }
    }

    async findByIdStatus(id, status) {
        try {
            const idTypes = await this.findAll();
            return idTypes.find(idType => idType.id == id && idType.status === status);
        } catch (err) {
            console.log('Error finding idType by id and status:', err);
            throw err;
        }
    }


    async lastId() {
        try {
            const idTypes = await this.findAll();
            const lastId = idTypes.length > 0 ? idTypes[idTypes.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default IdTypesDaoFile;
