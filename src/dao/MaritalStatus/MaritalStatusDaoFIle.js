import fs from 'fs/promises';

const path = './src/data/maritalStatus.json';

class MaritalStatusDaoFile {
    async save(maritalStatus) {
        try {
            const maritalStatusDao = await this.findAll();
            const lastId = await this.lastId();
            const newMaritalStatus = { id: lastId + 1, ...maritalStatus };
            maritalStatusDao.push(newMaritalStatus);
            await fs.writeFile(path, JSON.stringify(maritalStatusDao, null, 2));
            return newMaritalStatus;
        } catch (error) {
            console.error('Error saving maritalStatus:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading maritalStatus:', err);
            return [];
        }
    }


    
    async findById(id) {
        try {
            const maritalsStatus = await this.findAll();
            const maritalStatus = maritalsStatus.find(maritalStatus => maritalStatus.id == id);
            return maritalStatus;
        } catch (err) {
            console.log('Error finding maritalStatus by id:', err);
            throw err;

        }
    }
    

    async findByCode(code) {
        try {
            const maritalsStatus = await this.findAll();
            const maritalStatus = maritalsStatus.find(maritalStatus => maritalStatus.code === code);
            return maritalStatus;
        } catch (err) {
            console.log('Error finding maritalStatus by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const maritalsStatus = await this.findAll();
            const maritalStatus = await this.findById(id);

            const index = maritalsStatus.findIndex(maritalStatus => maritalStatus.id == id);
            if (index !== -1) {
                maritalsStatus.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(maritalsStatus, null, 2));
                return maritalStatus;
            }

        } catch (err) {
            console.log('Error deleting maritalStatus by code:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const maritalStatus = await this.findAll();
            const index = maritalStatus.findIndex(maritalStatus => maritalStatus.id == id);
            if (index !== -1) {
                maritalStatus[index] = { id: maritalStatus[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: maritalStatus[index].user, date: maritalStatus[index].date, userUpdate: maritalStatus[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(maritalStatus, null, 2));
                return maritalStatus[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating maritalStatus by code:', err.message);
            throw new Error(err);
        }
    }

    async findAllByStatus(status) {
        try {
            const maritalStatus = await this.findAll();
            return maritalStatus.filter(maritalStatus => maritalStatus.status === status);
        } catch (err) {
            console.log('Error finding maritalStatus by status:', err);
            throw err;
        }
    }

    async findByCodeStatus(code, status) {
        try {
            const maritalStatus = await this.findAll();
            return maritalStatus.find(maritalStatus => maritalStatus.code === code && maritalStatus.status === status);
        } catch (err) {
            console.error('Error reading categories:', err);
            return [];
        }
    }

    async findByIdStatus(id, status) {
        try {
            const maritalsStatus = await this.findAll();
            return maritalsStatus.find(maritalStatus => maritalStatus.id == id && maritalStatus.status === status);
        } catch (err) {
            console.log('Error finding maritalStatus by id and status:', err);
            throw err;
        }
    }


    async lastId() {
        try {
            const maritalStatus = await this.findAll();
            const lastId = maritalStatus.length > 0 ? maritalStatus[maritalStatus.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default MaritalStatusDaoFile;
