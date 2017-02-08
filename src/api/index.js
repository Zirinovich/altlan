import {initPassport} from './auth/authPassport';
import {default as passport} from 'passport';

export {initPassport as init};

// TODO: так же нужен logoutAPI, аналогичный login
export function logout(req, res) {
    req.logout();
    res.redirect('/')
}

export function loginAPI(req, res, next) {
    passport.authenticate('local', (err, user, info) => { // err - ошибка в случае ошибки модулей; user - {obj}|false; info - информация если юзер false
        if (err) {
            return res.status(500).send(JSON.stringify(err))
        }
        if (!user) {
            // TODO: сделать return res.status(401).send(info.message); как только с json-ами разберешься
            return res.redirect('/login');
        }
        req.logIn(user, function (err) { // т.к. это кастомный callback, то необходимо явно вызывать req.logIn()
            if (err) {
                return next(err);
            }
            return res.json(req.user);
        });
    })(req, res, next);
}

export function login(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
}

// middleware
export function mustAuthenticate(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/login');
}

// middleware
export function mustAuthenticateAPI(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({message: "Authorization required!"});
}
