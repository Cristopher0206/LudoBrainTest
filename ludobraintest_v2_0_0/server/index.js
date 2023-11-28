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
/* Función para obtener el usuario de la sesión */
app.get('/getUser', (req, res) => {
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, envía la información del usuario
        res.send({
            id: req.user.id,  // Asumiendo que el id del usuario está disponible en req.user
            username: req.user.username,
            name: req.user.name
        });
    } else {
        // Si el usuario no está autenticado, envía un objeto vacío o un código de error
        res.status(401).send({message: "Usuario no autenticado"});
    }
})
/* Función para el Login */
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
/* Funciones de registro */
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
app.post('/crearNinio', (req, res) => {
    const id_educador = req.user.id;
    const {nombre, edad} = req.body;
    const querySelect = "SELECT * FROM niño WHERE nombre = ?"
    db.query(querySelect, [nombre], (err, result) => {
        if (err) { /* La consulta no pudo ejecutarse */
            throw err;
        }
        if (result.length > 0) { /* La consulta encontró un niño en la base */
            const querySelect2 = 'SELECT * FROM educador_niño WHERE id_educador = ? AND id_niño = ?';
            db.query(querySelect2, [id_educador, result[0].id_ninio], (err, result3) => {
                if (err) {
                    throw err;
                }
                if(result3.length > 0){
                    res.send({message: 'Este niño ya se encuentra registrado'});
                }
                if(result3.length === 0) {
                    const queryInsert2 = 'INSERT INTO educador_niño (id_educador, id_niño) VALUES (?, ?)';
                    db.query(queryInsert2, [id_educador, result[0].id_ninio], (err, result4) => {
                        if(err) {
                            throw err;
                        }
                        res.send({message: 'Niño creado correctamente'});
                    })
                }
            })
        }
        if (result.length === 0) {
            const queryInsert = "INSERT INTO niño (nombre, edad) VALUES (?,?)";
            db.query(queryInsert, [nombre, edad], (err, result) => {
                if (err) {
                    throw err;
                }
                // Se selecciona el id del niño ingresado recientemente
                const querySelectNinio = 'SELECT id_ninio FROM niño WHERE nombre = ?';
                db.query(querySelectNinio, [nombre], (err, result2) => {
                    if(err){
                        throw err;
                    }
                    const id_ninio = result2[0].id_ninio;
                    // Se inserta el id del educador y del niño en la tabla auxiliar
                    const queryInsertAuxTable = 'INSERT INTO educador_niño (id_educador, id_niño) VALUES (?, ?)';
                    db.query(queryInsertAuxTable, [id_educador, id_ninio], (err, result2) => {
                        if (err) {
                            throw err;
                        }
                    })
                });
                res.send({message: "Niño creado correctamente"});
            });
        }
    });
});
/* Funciones de Lectura */
app.get('/getChildren', (req, res) => {
    const id_educador = req.user.id;
    const query = 'SELECT niño.id_ninio, niño.nombre, niño.edad ' +
        'FROM niño JOIN educador_niño ' +
        'ON niño.id_ninio = educador_niño.id_niño ' +
        'WHERE educador_niño.id_educador = ? ' +
        'ORDER BY niño.edad;';
    db.query(query, [id_educador], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
/* Funciones de actualización */

/* Funciones de eliminación */
app.post('/deleteChild', (req, res) => {
    const id_educador = req.user.id;
    const id_ninio = req.body.id_ninio;
    const queryDelete = 'DELETE FROM educador_niño WHERE id_educador = ? AND id_niño = ?';
    db.query(queryDelete, [id_educador, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({message: 'Niño eliminado exitosamente'});
        /*const queryDelete2 = 'DELETE FROM niño WHERE id_ninio = ?';
        db.query(queryDelete2, [id_ninio], (err, result) => {
            if (err) {
                throw err;
            }
            res.send({message: 'Niño eliminado exitosamente'});
        })*/
    })
})