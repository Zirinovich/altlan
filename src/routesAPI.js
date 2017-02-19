import express from 'express';
import {mustAuthenticateAPI, loginRestoreAPI} from 'api';

export const router = express.Router();

// router.post('/login', (req, res) => {
//     const login = req.body.login;
//     const password = req.body.password;
//     console.log(req.body);
//
//     if (!login && !password) {
//         return res.status(400).send("You must send the username and the password");
//     }
//
//     const exists = users.username === login && users.password === password;
//     if (!exists) {
//         return res.status(401).send("The username or password don't match");
//     }
//
//     res.status(201).send({id_token: "must be new token"}); // TODO: реализовать токены и сессии
// });

// router.post('/signup', (res, req) => {
//     res.status(201).send({id_token: "must be new token"}); // TODO: сделать регистрацию.
// });

router.all('/*', mustAuthenticateAPI);

router.post('/login', loginRestoreAPI);

router.get('/test',(req, res, next)=>{
    res.status(200).json(req.user);
});

/*// NOTE: middleware that is specific to this router
 router.use(function timeLog(req, res, next) {
 console.log('Time: ', Date.now());
 next();
 });*/


/*
 // NOTE: Parameters
 router.get('/secret/:key', function (req, res) {
 var key = req.params.key;
 res.end('Password: ' + key);
 });

 // NOTE: Query
 router.get('/secret*', function (req, res) {
 var key = req.query.key;
 res.end('Password: ' + key);
 });*/
