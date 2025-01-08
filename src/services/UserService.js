import UserRepository from '../repository/UserRepository.js';
import UserModel from '../models/UserModel.js';
import UserDTO from '../dto/UserDTO.js';
import EmployeeRepository from '../repository/EmployeeRepository.js';
import { createHash } from '../utils/bcrypt.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.employeeRepository = new EmployeeRepository();
    }

    async createUser(username, password, description, employeeId, status) {
        //Validaciones de las llaves foraneas.
        await this.validateEmployeeId(employeeId);

        const passHash = createHash(password);

        const existingUser = await this.userRepository.findByUser(username);
        if (existingUser) {
            throw new Error('Username already exists with the same code');
        }

        const user = await new UserModel({ username, password: passHash, description, employeeId, status });
        const savedUser = await this.userRepository.save(user);
        return await UserDTO.fromModel(savedUser);
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new Error('Users not found');
        }
        return users.map(user => UserDTO.fromModel(user));
    }

    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return UserDTO.fromModel(user);
    }

    async getUserByUser(username) {
        const user = await this.userRepository.findByUser(username);
        if (!user) {
            return null;
        }
        return UserDTO.fromModel(user);
    }

    async getUserByQuery(query) {
        const user = await this.userRepository.findByQuery(query);
        if (!user) {
            throw new Error('User not found');
        }
        return UserDTO.fromModel(user);
    }

    async deleteUserById(id) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        const deletedUser = await this.userRepository.deleteUserById(id);
        return UserDTO.fromModel(deletedUser);
    }

    async updateUserById(id, newUsername, newPassword, newDescription, newEmployeeId, newStatus) {
        console.log(id, newUsername, newPassword, newDescription, newEmployeeId, newStatus);

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        //Validaciones de las llaves foraneas.
        await this.validateEmployeeId(newEmployeeId);

        const existingUser = await this.userRepository.findByUser(newUsername);
        if (existingUser && newUsername !== user.username) {
            throw new Error('Username already exists with the same code');
        }

        const updatedUser = await this.userRepository.updateUserById({ id, newUsername, newPassword, newDescription, newEmployeeId, newStatus });
        console.log('User updated', updatedUser);
        return UserDTO.fromModel(updatedUser);
    }

    async validateEmployeeId(employeeId) {
        const employee = await this.employeeRepository.findById(employeeId);
        if (!employee || !employee.status) {
            throw new Error('Employeee not valid or disabled');
        }
    }

}

export default UserService;
