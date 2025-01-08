import UserService from '../services/UserService.js';
import { isValidPassword } from '../utils/bcrypt.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class SessionController {

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const userService = new UserService();
            const user = await userService.getUserByUser(username);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            if (!isValidPassword(password, user)) {
                return res.status(401).json({ message: "Password incorrect" });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN   
            });

            return res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true }).status(200).json({ message: "Login successful", token });
            
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ error: error.message });
        }
    }

    logout(req, res) {
        res.clearCookie(process.env.COOKIE_NAME);
        res.status(200).json({ message: 'Logout successful' });
    }

    async current(req, res) {
        try {
            res.send(req.user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default SessionController;
