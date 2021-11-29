const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postSeccion } = require('../controllers/SeccionController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    validarCampos
], postSeccion);

module.exports = router;