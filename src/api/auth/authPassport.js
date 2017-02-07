import {Strategy} from 'passport-local';
import {default as passport} from 'passport';

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
    else{
        let user = constUsers.find(user => {
            return user.username === username;
        });
        callback(null, user);
    }
}

export function initPassport(){
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
                console.log('Well auth');
                return done(null, user);
            });
        })
    );

    // NOTE: можно присвоить мидлварь для аутентификации, пример ниже
    //passport.authenticationMiddleware = authenticationMiddleware;
}

// function authenticationMiddleware () {
//     return function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next()
//         }
//         res.redirect('/')
//     }
// }

// NOTE: Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.
passport.serializeUser(function (user, callback) {
    console.log('call serialize user ');
    callback(null, user.username);
});

// NOTE: смотри комментарии http://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session
passport.deserializeUser(function (username, callback) {
    console.log('call deSerialize user ' + username);
    findUser(username, callback);
});
