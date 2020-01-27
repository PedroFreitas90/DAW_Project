const mongoose = require('mongoose')

var ficheiroSchema = new mongoose.Schema({
    name: String,
    mimetype: String,
    size: Number,
    originalName:String,
})

module.exports = mongoose.model('ficheiro', ficheiroSchema)