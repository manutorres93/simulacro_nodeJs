 const mongoose = require('mongoose');
let Student;

const connectDatabase= async () =>{
    try{
        if(!Student){
            Student= mongoose.model('estudiantes',require('../models/studentModel').schema);
        }

        await mongoose.connect('mongodb+srv://manutorres9312:Wwl9ejoe1FicGqTV@db-ejemplo-01.elrgq55.mongodb.net/')
        .then (()=> console.log('Conectado a MongoDb'))
        .catch((error)=> console.log(error));

        await inicializarData();
        
    }catch(error){
        console.log('Falla al conectar',error);
        process.exit(1);
    }
};

const inicializarData= async () =>{
    
    try {
        await Student.deleteMany();

        const estudiantesData=[
            {
                name:'Manuela',
                identification: '1088313',
                age: 30,
                password: '123'
            },
            {
                name:'Valentina',
                identification: '121474',
                age: 25,
                password: '456'
            },
            {
                name:'Monica',
                identification: '3023832',
                age: 57,
                password: '789'
            }
        ];

        await Student.insertMany(estudiantesData);
        console.log('Data inicializada exitosamente');
        
    } catch (error) {
        console.error('Falla al inicializar data',error);
        process.exit(1);
        
    }
    

}

module.exports = connectDatabase;