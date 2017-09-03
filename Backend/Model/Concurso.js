'user strict'

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

//Modelo 
const ConcursoSchema = Schema({
    userId: {type: String, required:true},
    nombre: String,
    imagen: String,
    url: String,
    fechaInicio: {type: Date, default: Date.now()},
    fechaFin: Date, 
    premio: String
})

//Para exportar el modelo a mongo, se le da un nombre y el esquema asociado
module.exports = mongoose.model('Concurso', ConcursoSchema)