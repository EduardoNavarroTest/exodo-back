import UserService from '../services/UserService.js';

const userService = new UserService();

class UserController {
    async createUser(req, res) {
        const { username, password, description, employeeId, status } = req.body;
        try {
            const user = await userService.createUser(username, password, description, employeeId, status);
            res.status(201).json(user);
        } catch (error) {
            console.log(`Error service: ${error}`);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUserByQuery(req, res) {
        const { query } = req.params;
        try {
            const user = await userService.getUserByQuery(query);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUserByUser(req, res) {
        const { user } = req.params;
        try {
            const username = await userService.getUserByUser(user);
            if (!username) {
                throw new Error('User not found');
            }
            res.status(200).json(username);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }


    async deleteUserById(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await userService.deleteUserById(id);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUserById(req, res) {
        const { id } = req.params;
        const { newUsername, newPassword, newDescription, newEmployeeId, newStatus } = req.body;
        try {
            const updatedUser = await userService.updateUserById(id, newUsername, newPassword, newDescription, newEmployeeId, newStatus);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;