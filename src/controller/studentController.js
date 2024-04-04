const Student = require('../models/studentModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const { model } = require('mongoose');
const jwt_secret ="password";

const studentControler= {

    /* Get all students */

    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.status(200).json(students);
        } catch (error) {
            console.error('Error al obtener el estudiante',error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    /* Get by id */

    getStudentById: async (req, res) => {
        try {
            const id= req.params.id;
            const studentId = await Student.findById(id);
            res.json(studentId)
        } catch (error) {
            console.error('Error al obtener el estudiante',error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    /* Post */

    createStudent: async (req, res) => {
        const studentData = req.body;

        try {
            const newStudent = new Student(studentData);
            const savedStudent = await newStudent.save();
            res.status(201).json(savedStudent);
        } catch (error) {
            console.error('Error al crear el estudiante',error);
            res.status(500).json({message: 'Internal Server Error'});
            
        }
    },

    /* Put */

    /* updateStudent: async (req, res) => {
        try {
            const {name}= req.params;
            const student= await Student.findByIdAndUpdate(id, req.body, {new:true});
            /* const studentUpdate = await Student.findOneAndUpdate(
                {name: name},
                {$set: {name:'No Aplica'}}
            
            res.json(studentUpdate);            
        } catch (error) {
            console.error('Error al crear el estudiante',error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }, */

    updateStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(student);
        } catch (error) {
            console.error('Error al crear el estudiante',error);
            res.status(500).json(error);
        }
    },

    /* Delete */

    deleteStudent: async (req, res) => {
        try {
            //const {name}= req.params;
            const id = req.params.id;
            const studentDelete= await Student.findByIdAndDelete(id);
            /* const studentDelete = await Student.findOneAndDelete(
                {name: name}
            ); */
            res.json(studentDelete);            
        } catch (error) {
            console.error('Error al crear el estudiante',error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },

    /* login */

    login: async (req, res) => {
        try {
            const {identification, password} = req.body;
            const student = await Student.find({identification:identification});
            
            if (!student) {
                return res.status(400).json({message: "Invalid username or password"});     
             }
 
             const isPasswordValid = await bcrypt.compare(password, student[0].password);
 
             if (!isPasswordValid) {
                 return res.status(400).json({message: "Invalid username or password"});     
             }
             
             const token = jwt.sign({studentid: student.id }, jwt_secret, {
                 expiresIn: "1h"
             })
 
             res.json({message: "Logged in successfully", token})
            
            
            
        } catch (error) {

            console.error('Error al loguear el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            
        }
    },

    register: async (req, res) => {
        try {
            const students = await Student.find();
            const { name, password, identification, age } = req.body;

            const studentData = {
                name: name,
                identification: identification,
                password: await bcrypt.hash(password,10),
                age: age
            }

            const newStudent = new Student(studentData);
            const savedStudent = await newStudent.save(); 
            res.status(201).json(savedStudent)

        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



}

module.exports = studentControler; 