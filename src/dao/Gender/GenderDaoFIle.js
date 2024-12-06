import fs from 'fs/promises';

const path = './src/data/genders.json';

class GenderDaoFile {
    async save(gender) {
        try {
            const genders = await this.findAll();
            const lastId = await this.lastId();
            const newGender = { id: lastId + 1, ...gender };
            genders.push(newGender);
            await fs.writeFile(path, JSON.stringify(genders, null, 2));
            return newGender;
        } catch (error) {
            console.error('Error saving gender:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading genders:', err);
            return [];
        }
    }


    
    async findById(id) {
        try {
            const genders = await this.findAll();
            const gender = genders.find(gender => gender.id == id);
            return gender;
        } catch (err) {
            console.log('Error finding gender by id:', err);
            throw err;

        }
    }
    

    async findByCode(code) {
        try {
            const genders = await this.findAll();
            const gender = genders.find(gender => gender.code === code);
            return gender;
        } catch (err) {
            console.log('Error finding gender by code:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const genders = await this.findAll();
            const gender = await this.findById(id);

            const index = genders.findIndex(gender => gender.id == id);
            if (index !== -1) {
                genders.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(genders, null, 2));
                return gender;
            }

        } catch (err) {
            console.log('Error deleting gender by code:', err.message);
            throw new Error(err);
        }
    }

    async updateById(id, newCode, newName, newDescription, newStatus) {
        try {
            const genders = await this.findAll();
            const index = genders.findIndex(gender => gender.id == id);
            if (index !== -1) {
                genders[index] = { id: genders[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: genders[index].user, date: genders[index].date, userUpdate: genders[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(genders, null, 2));
                return genders[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating gender by code:', err.message);
            throw new Error(err);
        }
    }

    async findAllByStatus(status) {
        try {
            const genders = await this.findAll();
            return genders.filter(gender => gender.status === status);
        } catch (err) {
            console.log('Error finding genders by status:', err);
            throw err;
        }
    }

    async findByCodeStatus(code, status) {
        try {
            const genders = await this.findAll();
            return genders.find(gender => gender.code === code && gender.status === status);
        } catch (err) {
            console.error('Error reading categories:', err);
            return [];
        }
    }

    async findByIdStatus(id, status) {
        try {
            const genders = await this.findAll();
            return genders.find(gender => gender.id == id && gender.status === status);
        } catch (err) {
            console.log('Error finding gender by id and status:', err);
            throw err;
        }
    }


    async lastId() {
        try {
            const genders = await this.findAll();
            const lastId = genders.length > 0 ? genders[genders.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default GenderDaoFile;
