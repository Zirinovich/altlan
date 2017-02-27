import {initPassport} from './auth/authPassport';
import {default as passport} from 'passport';

export {initPassport as init};

export function loginAPI(req, res, next) {
    passport.authenticate('local', (err, user, info) => { // err - ошибка в случае ошибки модулей; user - {obj}|false; info - информация если юзер false
        if (err) {
            console.log(err);
            return res.status(500).send(JSON.stringify(err));
        }
        if (!user) {
            console.log(info);
            return res.json({errors: info});
        }
        req.logIn(user, function (err) { // т.к. это кастомный callback, то необходимо явно вызывать req.logIn()
            if (err) {
                return next(err);
            }
            return res.json({account: req.user});
        });
    })(req, res, next);
}

export function logoutAPI(req, res, next) {
    req.logout();
    return res.json({result: 'ok'});
}

export function login(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
}

// middleware
export function mustAuthenticateAPIMiddleware(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({message: "Authorization required!"});
}
