const moongose = require('mongoose');

const Schema = moongose.Schema;
const preguntaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    tipoPregunta: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TipoPregunta',
        required: true
    },
    optionRespuesta: [
        {
            type: String
        }
    ],
    state: {
        type: Boolean,
        default: false
    }
});

const Pregunta = moongose.model('Pregunta', preguntaSchema);
module.exports = {
    Pregunta
}