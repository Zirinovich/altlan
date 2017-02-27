import express from 'express';
import {mustAuthenticateAPIMiddleware, logoutAPI, loginAPI} from 'api';

export const router = express.Router();

router.post('/login', loginAPI);
router.all('/*', mustAuthenticateAPIMiddleware);
router.post('/logout', logoutAPI);
router.get('/test',(req, res, next)=>{
    res.status(200).json(req.user);
});

/*// NOTE: middleware that is specific to this router
 router.use(function timeLog(req, res, next) {
 console.log('Time: ', Date.now());
 next();
 });*/


/*// NOTE: Parameters
 router.get('/secret/:key', function (req, res) {
 var key = req.params.key;
 res.end('Password: ' + key);
 });

 // NOTE: Query
 router.get('/secret*', function (req, res) {
 var key = req.query.key;
 res.end('Password: ' + key);
 });*/
