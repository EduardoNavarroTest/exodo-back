import EmployeeRepository from '../repository/EmployeeRepository.js';
import EmployeeModel from '../models/EmployeeModel.js';
import EmployeeDTO from '../dto/EmployeeDTO.js';
import IdTypesRepository from '../repository/IdTypesRepository.js';
import GenderRepository from '../repository/GenderRepository.js';

class EmployeeService {
    constructor() {
        this.employeeRepository = new EmployeeRepository();
        this.idTypesRepository = new IdTypesRepository();
        this.genderRepository = new GenderRepository();
    }

    async createEmployee(typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status) {

        //Validaciones de las llaves foraneas.
        await this.validateTypeId(typeId);
        await this.validateGender(genderId);

        /**REEMPLAZAR POR EL BARCODE */
        const existingEmployee = await this.employeeRepository.findByQuery(codeId);
        if (existingEmployee) {
            throw new Error('Employee already exists with the same barcode');
        }

        const employee = await new EmployeeModel({ typeId, codeId, firstName, middleName, lastName, secondLastName, address, phone, email, mobile, genderId, birthDate, image, description, status });
        const savedEmployee = await this.employeeRepository.save(employee);
        return await EmployeeDTO.fromModel(savedEmployee);
    }

    async getAllEmployees() {
        const employees = await this.employeeRepository.findAll();
        if (!employees) {
            throw new Error('Employees not found');
        }
        return employees.map(employee => EmployeeDTO.fromModel(employee));
    }

    async getEmployeeById(id) {
        const employee = await this.employeeRepository.findById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return EmployeeDTO.fromModel(employee);
    }

    async getEmployeeByQuery(query) {
        const employee = await this.employeeRepository.findByQuery(query);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return EmployeeDTO.fromModel(employee);
    }

    async deleteEmployeeById(id) {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (!existingEmployee) {
            throw new Error('Employee not found');
        }
        const deletedEmployee = await this.employeeRepository.deleteEmployeeById(id);
        return EmployeeDTO.fromModel(deletedEmployee);
    }

    async updateEmployeeById(id, newTypeId, newCodeId, newFirstName, newMiddleName, newLastName, newSecondLastName, newAddress, newPhone, newEmail, newMobile, newGenderId, newBirthDate, newImage, newDescription, newStatus) {

        const query = newCodeId; //TEST, DARLE MANEJO A ESTA VUELTA
        const employee = await this.employeeRepository.findById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }

        //Validaciones de las llaves foraneas.
        await this.validateTypeId(typeId);
        await this.validateGender(genderId);

        const existingEmployee = await this.employeeRepository.findByQuery(query);
        if (existingEmployee && newCodeId && newCodeId !== employee.codeId) { /** Entra aquí si existe el employeeo, si el barcode trae información y no es el mismo */
            throw new Error('Identification code already exists');
        }

        const updatedEmployee = await this.employeeRepository.updateEmployeeById({id, newTypeId, newCodeId, newFirstName, newMiddleName, newLastName, newSecondLastName, newAddress, newPhone, newEmail, newMobile, newGenderId, newBirthDate, newImage, newDescription, newStatus});
        return EmployeeDTO.fromModel(updatedEmployee);
    }

    async validateTypeId(typeId) {
        console.log(typeId);
        const type = await this.idTypesRepository.findById(typeId);
        if (!type || !type.status) {
            throw new Error('Identification Type not valid or disabled');
        }
    }

    async validateGender(genderId) {
        const gender = await this.genderRepository.findById(genderId);
        if (!gender || !gender.status) {
            throw new Error('Gender not valid or disabled');
        }
    }



}

export default EmployeeService;
