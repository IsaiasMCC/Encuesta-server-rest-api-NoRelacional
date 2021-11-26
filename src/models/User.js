const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    telefono: {
        type: String,
        required: [ true, 'El telefono es obligatorio']
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        required: [ true, 'La direccion es obligatorio']
    },
    genero: {
        type: String,
        required: [ true, 'El genero es obligatorio']
    },
    contrasena: {
        type: String,
        required: [ true, 'La contrasena es obligatorio']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}