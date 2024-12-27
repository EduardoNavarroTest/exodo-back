import EmployeeService from '../services/EmployeeService.js';

const employeeService = new EmployeeService();

class EmployeeController {
    async createEmployee(req, res) {
        const { typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status } = req.body;
        try {
            const employee = await employeeService.createEmployee(typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status);
            res.status(201).json(employee);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await employeeService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        const { id } = req.params;
        try {
            const employee = await employeeService.getEmployeeById(id);
            res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeByQuery(req, res) {
        const { query } = req.params;
        try {
            const employee = await employeeService.getEmployeeByQuery(query);
            res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeByCode(req, res) {
        const { code } = req.params;
        try {
            const employee = await employeeService.getEmployeeByCode(code);
            res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }


    async deleteEmployeeById(req, res) {
        const { id } = req.params;
        try {
            const deletedEmployee = await employeeService.deleteEmployeeById(id);
            res.status(200).json(deletedEmployee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployeeById(req, res) {
        const { id } = req.params;
        const { newTypeId, newCodeId, newFirstName, newMiddleName, newLastName, newSecondLastName, newAddress, newPhone, newEmail, newMobile, newGenderId, newBirthDate, newImage, newDescription, newStatus } = req.body;
        try {
            const updatedEmployee = await employeeService.updateEmployeeById(id, newTypeId, newCodeId, newFirstName, newMiddleName, newLastName, newSecondLastName, newAddress, newPhone, newEmail, newMobile, newGenderId, newBirthDate, newImage, newDescription, newStatus);
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default EmployeeController;



/**
 * 
 * 
 * async searchEmployees(criteria) {
    try {
        // Construcción dinámica de la consulta basada en los criterios proporcionados
        const query = {};
        if (criteria.id) query.id = criteria.id;
        if (criteria.codeId) query.codeId = criteria.codeId;
        if (criteria.firstName) query.firstName = new RegExp(criteria.firstName, "i"); // Búsqueda insensible a mayúsculas
        if (criteria.lastName) query.lastName = new RegExp(criteria.lastName, "i");

        const employees = await EmployeeModel.find(query); // Realizamos la consulta
        return employees;
    } catch (error) {
        throw new Error("Error al buscar empleados: " + error.message);
    }
}



 */