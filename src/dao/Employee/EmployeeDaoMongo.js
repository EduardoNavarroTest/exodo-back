import fs from 'fs/promises';

const path = './src/data/employees.json';

class EmployeeDaoMongo {
    async save(employee) {
        try {
            const employees = await this.findAll();
            const lastId = await this.lastId();
            const newEmployee = { id: lastId + 1, ...employee };
            employees.push(newEmployee);
            await fs.writeFile(path, JSON.stringify(employees, null, 2));
            return newEmployee;
        } catch (error) {
            console.error('Error saving employee:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data ? JSON.parse(data) : []; // Verifica si hay contenido antes de hacer parse
        } catch (err) {
            console.error('Error reading employees:', err);
            return [];
        }
    }


    async findByCode(code) {
        try {
            const employees = await this.findAll();
            const employee = employees.find(employee => employee.code === code);
            return employee;
        } catch (err) {
            console.log('Error finding employee by code:', err);
            throw err;

        }
    }

    async deleteByCode(code) {
        try {
            const employees = await this.findAll();
            const employee = await this.findByCode(code);

            const index = employees.findIndex(employee => employee.code === code);
            if (index !== -1) {
                employees.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(employees, null, 2));
                return employee;
            }

        } catch (err) {
            console.log('Error deleting employee by code:', err.message);
            throw new Error(err);
        }
    }

    async updateByCode(code, newCode, newName, newDescription, newStatus) {
        try {
            const employees = await this.findAll();
            const index = employees.findIndex(employee => employee.code === code);
            if (index !== -1) {
                employees[index] = { id: employees[index].id, code: newCode, name: newName, description: newDescription, status: newStatus, user: employees[index].user, date: employees[index].date, userUpdate: employees[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(employees, null, 2));
                return employees[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating employee by code:', err.message);
            throw new Error(err);
        }
    }


    async lastId() {
        try {
            const employees = await this.findAll();
            const lastId = employees.length > 0 ? employees[employees.length - 1].id : 0;
            return lastId;
        } catch (err) {
            console.log('Error finding last id:', err);
            return 0;
        }
    }
}

export default EmployeeDaoMongo;
