import {Strategy} from 'passport-local';

const constUsers = [{
    username: "admin",
    password: "qwe123@#",
    role: "admin",
}, {
    username: "test",
    password: "test",
    role: "user",
}];


function findUser(username, callback) { // NOTE: Функция поиска пользователя в базе, в жопе, где угодно...
    if (!username) {
        callback({message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"}, null);
    }
    else {
        let user = constUsers.find(user => {
            return user.username === username;
        });
        callback(null, user);
    }
}

export function initPassport(passport) {
    passport.use(
        new Strategy({
            usernameField: 'login',
            passwordField: 'password'
        }, (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user || password !== user.password) {
                    return done(null, false, {message: "Неверная комбинация 'логин/пароль'!"})
                }
                return done(null, user);
            });
        })
    );
    // NOTE: Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.
    passport.serializeUser(function (user, callback) {
        callback(null, user.username);
    });

    passport.deserializeUser(function (username, callback) {
        findUser(username, callback);
    });
}
// NOTE: можно присвоить мидлварь для аутентификации, пример ниже
// passport.authenticationMiddleware = authenticationMiddleware;
// function authenticationMiddleware () {
//     return function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next()
//         }
//         res.redirect('/')
//     }
// }
