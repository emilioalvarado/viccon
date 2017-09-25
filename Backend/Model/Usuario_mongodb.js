'user strict'

// const mongoose  = require('mongoose')
// const Schema = mongoose.Schema
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')
//Se obtiene el puerto desde una variable de entorno o se seta en 3000 si no se indica nda
var config = require('../config')

//db
const mysql = require('mysql2')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.MySql_db, config.MySql_user, config.Mysql_pass, 
                  {
                    host: config.MySql_host,
                    dialect: 'mysql',
                    port: config.MySql_port
                  });

const UsuarioSchema = sequelize.define('Usuario', {
    _id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: {type: Sequelize.STRING},
    apellidos: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING, unique: true, lowercase: true},
    clave: {type: Sequelize.STRING /*select:false*/}, //para que los get no retornen el password
    fechaRegistro: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    fechaUltimoIngreso: {type: Sequelize.DATE},
    perfil: {type: Sequelize.STRING, enum: ['Admin', 'Concursante'], defaultValue: 'Admin'}
  },
    { 
        hooks: {
            beforeCreate: (user) => {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err)
                        return next(err)
                    bcrypt.hash(user.clave, salt, null, (err, hash) => {
                        if(err)
                            return next(err)
                        user.clave = hash
                        
                    })
                })
            }
        }
        
    });

    UsuarioSchema.sync({logging: console.log})


//Funciòn que se ejecuta antes de que el 
//modelo se almacena en la base de datos
//y permite encriptar la contraseña.
// UsuarioSchema.beforeCreate((user, next) => {
//     //si el usuario no ha modificado su contraseña que continúe
//     bcrypt.genSalt(10, (err, salt) => {
//         if(err)
//             return next(err)
//         bcrypt.hash(user.clave, salt, null, (err, hash) => {
//             if(err)
//                 return next(err)
//             user.clave = hash
            
//         })
//     })
//   });

//Para exportar el modelo creado de mysql
module.exports = UsuarioSchema 

//Modelo en mongodb
// const UsuarioSchema = Schema({
    // nombres: String,
    // apellidos: String,
    // email: {type: String, unique: true, lowercase: true},
    // clave: {type: String, /*select:false*/}, //para que los get no retornen el password
    // fechaRegistro: {type: Date, default: Date.now()},
    // fechaUltimoIngreso: Date,
    // perfil: {type: String, enum: ['Admin', 'Concursante'], default: 'Admin'}
// })

// UsuarioSchema.pre('save'/*antes de guardar*/, function(next){
//     let user = this
//     //si el usuario no ha modificado su contraseña que continúe
//     if(!user.isModified('clave')) 
//         return next()
//     bcrypt.genSalt(10, (err, salt) => {
//         if(err)
//             return next(err)
//         bcrypt.hash(user.clave, salt, null, (err, hash) => {
//             if(err)
//                 return next(err)
//             user.clave = hash
//             next()
//         })
//     })
// })

//Función para asignar un avatar a través del mail
//Hace uso de usa librería crypto para 
// UsuarioSchema.methods.gravatar = function(){
//     if(!this.email)
//         return `https://gravatar.com/avatar/?s=200&d=retro`
//     //Crear hash en md5 para buscar el avatar del usuario
//     //md5 es lo que usa gravatar en la url de un avatar
//     const md5 = crypto.createHash('md5').update(this.email).digest('hex')
//     return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
// }


//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
//module.exports = mongoose.model('Usuario', UsuarioSchema)
