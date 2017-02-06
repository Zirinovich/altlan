import {Strategy} from 'passport-local';
import {default as passport} from 'passport';

passport.use(
    new Strategy({
        usernameField: 'login',
        passwordField: 'password'
    }, (username, password, done) => {
        // NOTE: сюда втыкаем аутентификацию из базы, например mongo через mongoose
        /*User.findOne({username: username}, function (err, user) {
         return err
         ? done(err)
         : user
         ? password === user.password
         ? done(null, user)
         : done(null, false, {message: 'Incorrect password.'})
         : done(null, false, {message: 'Incorrect username.'});
         });*/
        if (username !== 'test') {
            return done(null, false, {message: 'Нет такого пользователя и небыло!'});
        }
        if (password !== 'qwerty') {
            return done(null, false, {message: 'Неправильный пароль!'});
        }
        return done(null, {username: username, password: password});
        // NOTE: здесь возвращается объект содержащий поле 'пароль', но в реале этого делать не стоит
    })
);

// NOTE: Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// NOTE: смотри комментарии http://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session
passport.deserializeUser(function (id, done) {
    done(null, user);
});

export {passport};
