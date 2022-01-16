const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postEncuestaAplicada, getEncuestasAplicadas } = require('../controllers/EncuestaAplicadaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getEncuestasAplicadas);
router.post('/', [
    check('answers', 'El campo tipoPregunta es obligatorio').not().isEmpty(),
    validarCampos
], postEncuestaAplicada);

module.exports = router;