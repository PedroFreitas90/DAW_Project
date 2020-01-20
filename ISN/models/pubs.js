var mongoose = require('mongoose')

var ficheiroSchema = new mongoose.Schema({
    data: String,
    desc: String,
    name: String,
    mimetype: String,
    size: Number
})


var pubSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    id: String,
    text: String,
    ficheiros: [ficheiroSchema]
});


module.exports=mongoose.model('isn_dbs',pubSchema,'pubs')