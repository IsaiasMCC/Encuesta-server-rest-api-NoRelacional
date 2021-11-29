const mongoose = require('mongoose');
const { Pregunta } = require('../models/Pregunta');
const { Seccion } = require('../models/Seccion');

const postPregunta = async (req, res) => {
    const id = req.params.id;
    const validarId = mongoose.isValidObjectId(id); 
    if ( !validarId ){
        return res.status(400).json({ success: false, message: 'El id de la seccion es incorrecto'});   
    }
    const validarIdSeccion = await Seccion.findById(id);

    if ( !validarIdSeccion ){
        return res.status(400).json({ success: false, message: 'El id de la sección no existe'});   
    }
    const { name, tipoPregunta, optionRespuesta} = req.body; 

    const validarTipo = mongoose.isValidObjectId(tipoPregunta);
    if (!validarTipo ){
        return res.status(400).json({ success: false, message: 'El tipo de pregunta no es valido'});  
    }
    const pregunta = new Pregunta( { name, tipoPregunta, optionRespuesta});
    if (!pregunta){
        return res.status(400).json({ success: false, message: 'Error al crear la pregunta'}); 
    }
    await pregunta.save();
    const seccion = await Seccion.findByIdAndUpdate(id, { $push: { questions: pregunta.id} });
    
    if ( !seccion){
        return res.status(400).json({ success: false, message: 'Error al agregar pregunta a la seccion'}); 
    }
    return res.status(200).json({ success: true, message: 'pregunta agregada correctamente' });  
}

module.exports = {
    postPregunta
}