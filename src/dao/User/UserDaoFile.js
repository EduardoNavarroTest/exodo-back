import fs from 'fs/promises';

const path = './src/data/users.json';

class UserDaoFile {
    async save(user) {
        try {
            const users = await this.findAll();
            const lastId = await this.lastId();
            const newUser = { id: lastId + 1, ...user };
            users.push(newUser);
            await fs.writeFile(path, JSON.stringify(users, null, 2));
            return newUser;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading users:', err);
            return [];
        }
    }



    async findById(id) {
        try {
            const users = await this.findAll();
            const user = users.find(user => user.id == id);
            return user;
        } catch (err) {
            console.log('Error finding user by id:', err);
            throw err;

        }
    }


    async findByUser(username) {
        try {
            const users = await this.findAll();
            const user = users.find(user => user.username === username);
            return user;
        } catch (err) {
            console.log('Error finding user by username:', err);
            throw err;

        }
    }

    async deleteById(id) {
        try {
            const users = await this.findAll();
            const user = await this.findById(id);

            const index = users.findIndex(user => user.id == id);
            if (index !== -1) {
                users.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(users, null, 2));
                return user;
            }

        } catch (err) {
            console.log('Error deleting user by code:', err.message);
            throw new Error(err);
        }
    }

    async updateById(user) {
        const { id, newUsername, newPassword, newDescription, newEmployeeId, newStatus } = user;
        try {
            const users = await this.findAll();
            const index = users.findIndex(user => user.id == id);
            if (index !== -1) {
                users[index] = { id: users[index].id, username: newUsername, password: newPassword, description: newDescription, employeeId: newEmployeeId, status: newStatus, user: users[index].user, date: users[index].date, userUpdate: users[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(users, null, 2));
                return users[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating user by code:', err.message);
            throw new Error(err);
        }
    }

    async findByIdStatus(id, status) {
        try {
            const users = await this.findAll();
            return users.find(user => user.id == id && user.status === status);
        } catch (err) {
            console.log('Error finding user by id and status:', err);
            throw err;
        }
    }


    async lastId() {
        try {
            const users = await this.findAll();
            const lastId = users.length > 0 ? users[users.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default UserDaoFile;
