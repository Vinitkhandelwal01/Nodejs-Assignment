const { Router } = require('express');
// const { body, query } = require('express-validator');
const { addSchool, listSchools } = require('../controllers/schoolsController');
const { validateAddSchool, validateListSchools, handleValidation } =require('../validators/schoolsValidator');
const router = Router();

router.post('/addSchool', validateAddSchool, handleValidation, addSchool);
router.get('/listSchools', validateListSchools, handleValidation, listSchools);


module.exports = router;

