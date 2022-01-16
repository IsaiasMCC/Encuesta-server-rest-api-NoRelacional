const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postEncuesta, getEncuestas, getEncuesta, editEncuesta, deleteEncuesta} = require('../controllers/EncuestaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getEncuestas);
router.get('/:id', getEncuesta);
router.delete('/:id', deleteEncuesta);
router.post('/', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('nro_veces', 'El campo description es obligatorio').not().isEmpty(),
    check('fecha_vigencia', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], postEncuesta);

router.put('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('nro_veces', 'El campo description es obligatorio').not().isEmpty(),
    check('fecha_vigencia', 'El campo description es obligatorio').not().isEmpty(),
    validarCampos
], editEncuesta);

module.exports = router;