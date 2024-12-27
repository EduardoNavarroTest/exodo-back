import fs from 'fs/promises';

const path = './src/data/employees.json';

class EmployeeDaoFile {
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

    async findById(id) {
        try {
            const employees = await this.findAll();
            const employee = employees.find(employee => employee.id == id);
            return employee;
        } catch (err) {
            console.log('Error finding employee by identification code:', err);
            throw err;
        }
    }

    async deleteById(id) {
        try {
            const employees = await this.findAll();
            const employee = await this.findById(id);

            const index = employees.findIndex(employee => employee.id == id);
            if (index !== -1) {
                employees.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(employees, null, 2));
                return employee;
            }

        } catch (err) {
            console.log('Error deleting employee by id:', err.message);
            throw new Error(err);
        }
    }

    async updateById(employee) {
        const { id, newTypeId, newCodeId, newFirstName, newMiddleName, newLastName, newSecondLastName, newAddress, newPhone, newEmail, newMobile, newBirthDate, newImage, newGenderId, newDescription, newStatus } = employee;
        try {
            const employees = await this.findAll();
            const index = employees.findIndex(employee => employee.id == id);
            if (index !== -1) {
                employees[index] = { id: employees[index].id, typeId: newTypeId, codeId: newCodeId, firstName: newFirstName, middleName: newMiddleName, lastName: newLastName, secondLastName: newSecondLastName, address: newAddress, phone: newPhone, email: newEmail, mobile: newMobile, genderId: newGenderId, birthDate: newBirthDate, image: newImage, description: newDescription, status: newStatus, user: employees[index].user, date: employees[index].date, userUpdate: employees[index].userUpdate, dateUpdate: new Date() };
                await fs.writeFile(path, JSON.stringify(employees, null, 2));
                return employees[index];
            }
            return null;
        } catch (err) {
            console.log('Error updating employee by id:', err.message);
            throw new Error(err);
        }
    }

    async findByCode(code) {
        try {
            const employees = await this.findAll();
            const employee = employees.find(employee => employee.codeId == code);
            return employee;
        } catch (err) {
            console.log('Error finding employee by identification code:', err);
            throw err;
        }
    }

    async findByQuery(query) {
        // try {
        //     const employees = await this.findAll();
        //     const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(query.toLowerCase()));
        //     return filteredEmployees;
        // } catch (err) {
        //     console.log('Error finding employees by query:', err);
        //     throw err;
        // }
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

export default EmployeeDaoFile;
