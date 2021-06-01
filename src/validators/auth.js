const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 charactor long')
];

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 charactor long') 
];

exports.isRequestValidated = (req, res, next) => {
   const errors =  validationResult(req);
   if(errors.array().length > 0){
       return res.status(400).json({error: errors.array()[0].msg});
   }
   next();
}