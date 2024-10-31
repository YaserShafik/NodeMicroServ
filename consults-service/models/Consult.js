const mongoose = require('mongoose')

const consultSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required:true},
    consultText:{type:Text, required:true}
})

module.exports = mongoose.model('Order', consultSchema);