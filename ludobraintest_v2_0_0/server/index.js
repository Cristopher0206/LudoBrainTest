const {useRouter} = require('next/router');
const express = require('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(boddParser.urlencoded({extended: true}));
app.use(boddParser.json());
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(3001, () => {
    console.log('Server started on port 3001');
})
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send('Este usuario no existe');
        }
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    throw err;
                }
                res.send("Usuario logeado");
            })
        }
    })(req, res, next)
});
app.post('/registrarEducador', (req, res) => {
    const {usuario, user_password, nombre, apellido} = req.body;
    const querySelect = "SELECT * FROM educador WHERE usuario = ?"
    db.query(querySelect, [usuario], (err, result) => {
        if (err) { /* La consulta no pudo ejecutarse */
            throw err;
        }
        if (result.length > 0) { /* La consulta encontró un dato en la base */
            res.send({message: 'El usuario ya se encuentra registrado'});
        }
        if (result.length === 0) {
            const queryInsert = "INSERT INTO educador (usuario, user_password, nombre, apellido) VALUES (?,?,?,?)";
            db.query(queryInsert, [usuario, user_password, nombre, apellido], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send({message: "Usuario creado correctamente"});
            });
        }
    });
});