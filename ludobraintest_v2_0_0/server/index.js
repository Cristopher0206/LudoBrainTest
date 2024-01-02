const {useRouter} = require('next/router');
const express = require('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
const multer = require("multer");
const path = require("path");

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
            id: req.user.id,  // Asumiendo que el ID del usuario está disponible en req.user
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
                if (result3.length > 0) {
                    res.send({message: 'Este niño ya se encuentra registrado'});
                }
                if (result3.length === 0) {
                    const queryInsert2 = 'INSERT INTO educador_niño (id_educador, id_niño) VALUES (?, ?)';
                    db.query(queryInsert2, [id_educador, result[0].id_ninio], (err, result4) => {
                        if (err) {
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
                    if (err) {
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
//const upload = multer({storage: storage}).array("files", 5);
//const upload = multer({dest: path.join(__dirname, 'images')}).array('imagen_$',5);
// Configuración de multer para guardar archivos en una carpeta
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images"); // La carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const index = req.body.imagenIndex || 0; // Obtener el índice del campo imagenIndex
        cb(null, `${file.originalname}`); // ${path.extname(file.originalname)} Esta es la extensión del archivo
    },
});
const upload = multer({storage}).array('imagenes', 100);

app.post('/uploadQuestion', upload, (req, res) => {
    const pregunta = req.body;
    console.log("Soy el cuerpo: ", pregunta);
    const querySelectPregunta = 'SELECT * FROM pregunta WHERE pregunta = ?'; // Consulta para verificar si la pregunta ya se encuentra registrada
    db.query(querySelectPregunta, [pregunta.pregunta], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({message: 'Esta pregunta ya se encuentra registrada'});
        }
        if (result.length === 0){
            const queryInsertQuestion = 'INSERT INTO pregunta (id_seccion,pregunta) VALUES (?,?)';
            db.query(queryInsertQuestion, [pregunta.idSection, pregunta.pregunta], (err, result) => {
                if (err) {
                    throw err;
                }
                const querySelectQuestion = 'SELECT id_pregunta FROM pregunta WHERE pregunta = ?';
                db.query(querySelectQuestion, [pregunta.pregunta], (err, result1) => {
                    if (err) {
                        throw err;
                    }
                    const id_pregunta = result1[0].id_pregunta;
                    const respuestas = req.files;
                    const querySelectImage = 'SELECT * FROM respuesta WHERE imagen = ?'; // Consulta para verificar si la imagen ya se encuentra registrada
                    const queryInsertImage = 'INSERT INTO respuesta (imagen, respuesta_correcta, numero_fila) VALUES (?,?,?)';
                    pregunta.imagenIndex.forEach((img, index) => {
                        db.query(querySelectImage, [respuestas[index].originalname], (err, result2) => {
                            if (err) {
                                throw err;
                            }
                            if (result2.length > 0) {
                                //res.send({message: 'Esta imagen ya se encuentra registrada'});
                                const queryInsertQuestionAnswer = 'INSERT INTO pregunta_respuesta (id_pregunta, id_respuesta) VALUES (?,?)';
                                db.query(queryInsertQuestionAnswer, [id_pregunta, result2[0].id_respuesta], (err, result3) => {
                                    if (err) {
                                        throw err;
                                    }
                                })
                            } else {
                                db.query(queryInsertImage, [respuestas[index].originalname, pregunta.respuestaCorrecta[index], pregunta.fila[index]], (err, result4) => {
                                    if (err) {
                                        throw err;
                                    }
                                    const queryInsertQuestionAnswer = 'INSERT INTO pregunta_respuesta (id_pregunta, id_respuesta) VALUES (?,?)';
                                    db.query(queryInsertQuestionAnswer, [id_pregunta, result4.insertId], (err, result5) => {
                                        if (err) {
                                            throw err;
                                        }
                                    })
                                })
                            }
                        })
                    })
                    res.send({message: "Pregunta creada correctamente"});
                })
            })
        }
    });
})
app.post('/createTest', upload, (req, res) => {
    const {nombre, seccion, preguntas} = req.body;
    const querySelect = 'SELECT * FROM test WHERE nombre_test = ?';
    db.query(querySelect, [nombre], (err, result1) => {
        if (err) {
            throw err;
        }
        if (result1.length > 0) {
            res.send({message: 'Este test ya ha sido creado'});
        }
        if (result1.length === 0) {
            /* Primero, obtener el id de la sección*/
            const querySelectSection = 'SELECT * FROM seccion WHERE nombre_seccion = ?';
            db.query(querySelectSection, [seccion], (err, result2) => {
                if (err) {
                    throw err;
                }
                const id_seccion = result2[0].id_seccion;
                const queryInsert = 'INSERT INTO test (nombre_test, id_seccion) VALUES (?,?)';
                db.query(queryInsert, [nombre, id_seccion], (err, result2) => {
                    if (err) {
                        throw err;
                    }
                    const querySelectTest = 'SELECT id_test FROM test WHERE nombre_test = ?';
                    db.query(querySelectTest, [nombre], (err, result3) => {
                        if (err) {
                            throw err;
                        }
                        const id_test = result3[0].id_test;
                        const querySelectQuestion = 'SELECT * FROM pregunta WHERE pregunta = ?';
                        preguntas.forEach((pregunta, index) => {
                            db.query(querySelectQuestion, [pregunta.pregunta], (err, result4) => {
                                if (err) {
                                    throw err;
                                }
                                if (result4.length > 0) {
                                    const queryInsertTestQuestion = 'INSERT INTO test_pregunta (id_test, id_pregunta) VALUES (?,?)';
                                    db.query(queryInsertTestQuestion, [id_test, result4[0].id_pregunta], (err, result5) => {
                                        if (err) {
                                            throw err;
                                        }
                                    })
                                }
                            })
                        })
                        res.send({message: "Test creado correctamente"});
                    })
                })
            })
        }
    })
})
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
app.post('/getChildrenById', (req, res) => {
    const id = req.body.id_ninio;
    const querySelect = 'SELECT * FROM niño WHERE id_ninio = ?';
    db.query(querySelect, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getSections', (req, res) => {
    const query = 'SELECT * FROM seccion';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post('/getPreguntasBySeccion', (req, res) => {
   const seccion = req.body.seccion;
   console.log(seccion);
   const query = 'SELECT * FROM pregunta JOIN seccion ON pregunta.id_seccion = seccion.id_seccion ' +
       'WHERE seccion.nombre_seccion = ?';
    db.query(query, [seccion], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
/* Funciones de actualización */
app.post('/updateChildren', (req, res) => {
    const {id_ninio, nombre, edad} = req.body;
    // Construye la consulta de actualización
    const queryUpdate = `UPDATE niño SET nombre = ?, edad = ? WHERE id_ninio = ?;`;
    // Ejecuta la consulta de actualización con los valores correspondientes
    db.query(queryUpdate, [nombre, edad, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({message: "Niño actualizado exitosamente"});
    });
});
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
    })
})