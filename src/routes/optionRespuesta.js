const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postOptionRespuesta } = require('../controllers/OptionRespuestaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/', [
    check('id_pregunta', 'El campo id_pregunta es obligatorio').not().isEmpty(),
    check('value', 'El campo valor es obligatorio').not().isEmpty(),
    validarCampos
], postOptionRespuesta);

module.exports = router;