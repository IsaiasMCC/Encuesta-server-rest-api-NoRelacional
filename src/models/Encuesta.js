const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const encuestaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    sections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seccion'
    }],
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_modificacion: {
        type: Date,
        default: ''
    },
    state: {
        type: Boolean,
        default: false
    }
});

const Encuesta = mongoose.model('Encuesta', encuestaSchema);
module.exports = {
    Encuesta
}