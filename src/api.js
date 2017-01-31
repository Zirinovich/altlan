import express  from 'express';
import * as bodyParser from 'body-parser';
import React from 'react';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let apiRouter = express.Router();

const corsOptions = {
    origin: 'http://localhost:3001'
};

app.use(cors(corsOptions));

apiRouter.post('/login', (req, res) => {
    console.log("запрос в API");
    const login = req.body.login;
    const password = req.body.password;
    console.log(req.body);

    if (login + password === "qwe123") {
        res.json({success: true});
    }
    else {
        // res.statusCode = 500;
        res.json({error: "Failed to authenticate!"});
    }
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
