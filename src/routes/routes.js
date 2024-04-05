const express= require('express');
const router= express.Router();
const studenController = require('../controller/studentController');
/* Ruta protegida */
/* const auth= require('../middleware/auth');
router.get('/api/v1/students', auth.authenticate(), studenController.getAllStudents); */

router.get('/api/v1/students', studenController.getAllStudents);
router.get('/api/v1/students/:id', studenController.getStudentById);
router.post('/api/v1/students', studenController.createStudent);
router.put('/api/v1/students/:id', studenController.updateStudent);
router.delete('/api/v1/students/:id', studenController.deleteStudent);

/* Para registro y login */

router.post('/register', studenController.register);
router.post('/login', studenController.login);

module.exports = router;