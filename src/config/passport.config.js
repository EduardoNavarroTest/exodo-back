import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import UserService from "../services/UserService.js";
import 'dotenv/config';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[process.env.COOKIE_NAME];
    }
    return token;
};

const initializePassport = () => {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
        try {
            const userService = new UserService();
            const user = await userService.getUserByUser(jwtPayload.username);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }
    ));

};

export default initializePassport;
