const mongoose = require('mongoose')


//Definición del esquema del estudiante.  
//Describe la estrutura de los documentos de la colección
const studentsSchema= new mongoose.Schema({
    name: String,
    identification: String,
    password: String,
    age: Number
});

const Student= mongoose.model('estudiante', studentsSchema);

module.exports = Student;