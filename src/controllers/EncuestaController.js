const mongoose = require('mongoose');
const { Encuesta } = require('../models/Encuesta');

const postEncuesta = async (req, res) => {
    const { name, description } = req.body;
    const encuesta = new Encuesta({ name, description });
    if (!encuesta ){
        return res.status(400).json({ success: false, message: 'encuesta no creada'});
    }
    await encuesta.save();
    return res.json({ success: true, encuesta});
    
}
const getEncuesta = async (req, res ) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id);
    if(!validarId ){
        return res.status(400).json({ success: false, message: 'El id no es valido'});
    }
    const encuesta = await Encuesta.findById(id).where('state').equals(true).populate({path: 'sections', select: '-status -__v -_id', populate: { path: 'questions', model: 'Pregunta', select: '-description -state -__v -_id', populate: { path: 'tipoPregunta', model: 'TipoPregunta', select: '-_id -__v '}}});
 
    if (!encuesta){
        return res.status(400).json({ success: false, message: 'La encuesta no fue encontrada'});
    }
    return res.json({ success: true, encuesta });
    
}
const getEncuestas = async (req, res) => {
    
    const encuestas = await Encuesta.find();
    if (!encuestas){
        res.status(400).json({ success: false, message: 'encuesta vacia'});
    }
    return res.json({ success: true, encuestas });
}
module.exports = {
    postEncuesta,
    getEncuesta,
    getEncuestas
}