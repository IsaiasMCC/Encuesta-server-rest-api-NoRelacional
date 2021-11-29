const mongoose = require('mongoose');

const { Encuesta } = require('../models/Encuesta');
const { Seccion } = require('../models/Seccion');

const postSeccion = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la encuesta es incorrecto'});   
    }
    const validarIdEncuesta = await Encuesta.findById(id);

    if ( !validarIdEncuesta ){
        return res.status(400).json({ success: false, message: 'El id de la encuesta no existe'});   
    }
    const { name } = req.body; 

    const seccion = new Seccion( { name });
    await seccion.save();
    const encuesta = await Encuesta.findByIdAndUpdate(id, { $push: { sections: seccion.id} });
    
    if ( !encuesta){
        return res.status(400).json({ success: false, message: 'Error al agregar pregunta a la encuesta'}); 
    }
    return res.status(200).json({ success: true, message: 'seccion agregada correctamente' });  
}

module.exports = {
    postSeccion
}