import passport from "passport";

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                return next(error)
            }

            if(!user) {
                return res.status(401).send({error: info.message || info.toString() }); 
            }

            req.user = user; 
            next(); 
        })(req, res, next)
    }
}

const authorization = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(403).send({error: "No tenemos permiso para ingresar"}); 
        }
        next();
    }
}

export { passportCall, authorization };