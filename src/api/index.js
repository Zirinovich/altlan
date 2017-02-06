import {passport} from './authPassportStrategy';



export function login(req, res, next) {
    passport.authenticate('local', (err, user, info)=>{
        console.log("error is - " + JSON.stringify(err));
        console.log("user are - " + JSON.stringify(user));
        console.log("next is - " + JSON.stringify(next));
        console.log("more is - " + JSON.stringify(info));
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/'); // NOTE: это тоже как то не очень, надо направлять туда, куда видимо обращался
        });
    })(req, res, next);
}

export function logout(req, res){
    req.logout();
    res.redirect('/')
}

export function mustAuthenticate(req, res, next) {
    // NOTE: вместо редиректа, возможно надо выставить статус код ошибки и ответ, типа неавторизован
    console.log("Вызов функции must authenticate!");
    console.log("mustAuth middle next is - " + JSON.stringify(next));
    req.isAuthenticated() ? next() : res.redirect('/login');
}

export function mustAuthenticateAPI(req, res, next){
    console.log("Вызов функции mustAuthenticateAPI!");
    if (req.isAuthenticated()){
        return next();
    }
    req.isAuthenticated() ? next() : res.redirect('/login');
}


export default passport;