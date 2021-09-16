/* 
Rutas:
host + /api/auth
*/
const {Router} = require('express')
const { check } = require('express-validator')
const {CreateUser, loginUser, revalidateToken} = require('../controllers/auth.controllers')
const {validateFields} = require('../middlewares/validateFields')
const {validateJWT} = require('../middlewares/validateJWT')
const router = Router()


router.post(
    '/new', 
    [//midelwares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ] 
    , CreateUser)

router.post(
    '/',
    [//midelwares
        check('email', 'email incorrecto').isEmail(),
        check('password', 'password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
     loginUser )

router.get('/renew', validateJWT, revalidateToken)

module.exports =  router;