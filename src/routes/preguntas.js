const { Router } = require('express');
const router = Router();
const { check }  = require('express-validator');
const { postPregunta, editPregunta, deletePregunta } = require('../controllers/PreguntaController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('tipoPregunta', 'El campo tipoPregunta es obligatorio').not().isEmpty(),
    check('multiple', 'El campo multiple es obligatorio').isBoolean(),
    validarCampos
], postPregunta);
router.put('/:id', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('tipoPregunta', 'El campo tipoPregunta es obligatorio').not().isEmpty(),
    check('multiple', 'El campo multiple es obligatorio').isBoolean(),
    validarCampos
], editPregunta);
router.delete('/:id', deletePregunta)

module.exports = router;