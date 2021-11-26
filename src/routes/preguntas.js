const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postPregunta } = require('../controllers/PreguntaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('tipoPregunta', 'El campo tipoPregunta es obligatorio').not().isEmpty(),
    validarCampos
], postPregunta);

module.exports = router;