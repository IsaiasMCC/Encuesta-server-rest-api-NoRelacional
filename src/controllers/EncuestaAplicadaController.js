const { EncuestaAplicada } = require('../models/EncuestaAplicada');
const { Encuesta } = require('../models/Encuesta');
const {OptionRespuesta } = require('../models/OptionRespuesta');
const mongoose = require('mongoose');

const postEncuestaAplicada = async (req, res ) => {
    const { id_encuesta, answers} = req.body;

    const validarId =  mongoose.isValidObjectId(id_encuesta);
    if (!validarId){
        return res.status(401).json({ success: false, message: 'Id no valido'});
    }
    const encuesta = await Encuesta.findById(id_encuesta);
    if (!encuesta){
        return res.status(401).json({ success: false, message: 'La encuesta no existe'});
    }
    const id_option_respuesta = new OptionRespuesta({value: 'Ninguno'});
    await id_option_respuesta.save();
    const answers1 = answers.map( (item) => {
        const container = item;
       
        if (!container.id_option_respuestas){
            container.id_option_respuestas = [id_option_respuesta.id];
        }
        return container
    });
    const encuestaaplicada = new EncuestaAplicada({ id_encuesta, answers: answers1 });
    if (!encuestaaplicada){
        return res.status(401).json({ success: false, message: 'Encuesta Aplicada no creada error'});
    }
    await encuestaaplicada.save();
    return res.json({ success: true, message: 'Encuesta Aplicada agregada correctamente'});
}

const getEncuestasAplicadas = async (req, res) => {
    const encuestasaplicadas = await EncuestaAplicada.find().populate([ { path: 'answers.id_question', model: 'Pregunta', select: 'name'}, { path: 'answers.id_option_respuestas', model: 'OptionRespuesta', select: 'value'}]);
    if (!encuestasaplicadas){
        return res.status(401).json({ success: false, message: 'Encuestas aplicadas no existen'});
    }
    res.json({ success: true, encuestasaplicadas});
}


module.exports = {
    postEncuestaAplicada,
    getEncuestasAplicadas
}