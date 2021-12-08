const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tipoPreguntaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true 
    },
    multiple: {
        type: Boolean,
    }
});

const TipoPregunta = mongoose.model('TipoPregunta', tipoPreguntaSchema);
module.exports = {
    TipoPregunta
}