const mongoose = require('mongoose');
const { Pregunta } = require('../models/Pregunta');
const { OptionRespuesta } = require('../models/OptionRespuesta');

const postOptionRespuesta = async (req, res) => {
    const { id_pregunta, value } = req.body;
    const validarId = mongoose.isValidObjectId(id_pregunta); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la Pregunta es incorrecto'});   
    }
    const validarIdPregunta = await Pregunta.findById(id_pregunta);

    if ( !validarIdPregunta ){
        return res.status(400).json({ success: false, message: 'El id de la pregunta no existe'});   
    }
    const optionrespuesta = new OptionRespuesta( { value });
    if (!optionrespuesta){
        return res.status(400).json({ success: false, message: 'Error al crear la option respuesta'}); 
    }
    await optionrespuesta.save();
    const respuesta = await Pregunta.findByIdAndUpdate(id_pregunta, { $push: { optionRespuesta: optionrespuesta.id} });
    
    if ( !respuesta){
        return res.status(400).json({ success: false, message: 'Error al agregar option respuesta a la pregunta'}); 
    }
    return res.status(200).json({ success: true, message: 'option respuesta agregada correctamente' });  
}

module.exports = {
    postOptionRespuesta
}