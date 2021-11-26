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
    const encuesta = await Encuesta.findById(id).populate({path: 'questions', populate: { path: 'tipoPregunta', select: 'name -_id',model: 'TipoPregunta' }});
 
    if (!encuesta){
        return res.status(400).json({ success: false, message: 'La encuesta no fue encontrada'});
    }
    return res.json({ success: true, encuesta });
    
}
const getEncuestas = async (req, res) => {
    const encuestaList = await Encuesta.find();
    // const encuestaList = await Encuesta.find().populate({path: 'questions', populate: { path: 'tipoPregunta', model: 'TipoPregunta' }});
    if (!encuestaList){
        res.status(400).json({ success: false, message: 'encuesta vacia'});
    }
    return res.json({ success: true, encuestaList });
}
module.exports = {
    postEncuesta,
    getEncuesta,
    getEncuestas
}