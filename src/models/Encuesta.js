const moongose = require('mongoose');

const Schema = moongose.Schema;
const encuestaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    questions: [{
            type: moongose.Schema.Types.ObjectId,
            ref: 'Pregunta'
    }],
    state: {
        type: Boolean,
        default: false
    }
});

const Encuesta = moongose.model('Encuesta', encuestaSchema);
module.exports = {
    Encuesta
}