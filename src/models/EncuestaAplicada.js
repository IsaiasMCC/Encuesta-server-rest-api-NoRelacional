const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encuestaAplicadaSchema = new Schema({
    id_encuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuesta',
        required: true
    },
    answers: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            id_question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pregunta',
                required: true
            },
            id_option_respuestas: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'OptionRespuesta',
                    required: true
                }
            ]
        }
    ]
});

const EncuestaAplicada = mongoose.model('EncuestaAplicada', encuestaAplicadaSchema);
module.exports = {
    EncuestaAplicada
}