const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postEncuesta, getEncuestas, getEncuesta} = require('../controllers/EncuestaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getEncuestas);
router.get('/:id', getEncuesta);
router.post('/', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], postEncuesta);

module.exports = router;