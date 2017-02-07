import {initPassport} from './auth/authPassport';
import {default as passport} from 'passport';

export {initPassport as init};

export function logout(req, res) {
    req.logout();
    res.redirect('/')
}

export function loginAPI(req, res, next) {
    passport.authenticate('local',(err, user, info)=>{ // err - ошибка в случае ошибки модулей; user - {obj}|false; info - информация если юзер false
        if(err){
            return res.status(500).send(JSON.stringify(err))
        }
        if(!user){
            // return res.status(401).send(info.message);
            return res.redirect('/login');
        }
        return res.redirect('/api/test');
    })(req, res, next);


    // const login = req.body.login;
    // const password = req.body.password;
    // console.log(req.body);

}

// middleware
export function mustAuthenticate(req, res, next) {
    // NOTE: вместо редиректа, возможно надо выставить статус код ошибки и ответ, типа неавторизован
    req.isAuthenticated() ? next() : res.redirect('/login');
}

// middleware
export function mustAuthenticateAPI(req, res, next) {
    console.log("Вызов функции mustAuthenticateAPI! isAuth=" + req.isAuthenticated());
    req.isAuthenticated() ? next() : res.status(401).json({message:"MUSTAUTH Неверная комбинация 'логин/пароль'!"});
}
