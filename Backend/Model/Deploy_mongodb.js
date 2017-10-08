//usar los nuevos tipos de variables y características de EMC6
'use strict'


const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Para usar el modelo hay q importarlo
const Usuario = require('../Model/Usuario')
//modulo de nodejs para enccriptar el password
const bcrypt = require('bcrypt-nodejs')
//modulo de node con funciones de criptografia
const crypto = require('crypto')

//Modelo en mongodb
const DeploySchema = Schema({
    nombre: String,
    tipo: {type: String, enum: ['bd', 'aws'], require: true},
    url: {type: String, unique: true, lowercase: true},
    key: {type: String, /*select:false*/}, //para que los get no retornen el password
    despliegue: {type: String, enum: ['a', 'b']},
    fechaRegistro: {type: Date, default: Date.now()}
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Deploy', DeploySchema)