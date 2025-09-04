const { query, body, validationResult } =require('express-validator');

const validateAddSchool = [
  body('name').isString().trim().notEmpty().withMessage('name is required'),
  body('address').isString().trim().notEmpty().withMessage('address is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('latitude must be a number between -90 and 90'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('longitude must be a number between -180 and 180')
];

const validateListSchools = [
  query('lat').isFloat({ min: -90, max: 90 }).withMessage('lat must be a number between -90 and 90'),
  query('lng').isFloat({ min: -180, max: 180 }).withMessage('lng must be a number between -180 and 180')
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { validateAddSchool, validateListSchools, handleValidation };