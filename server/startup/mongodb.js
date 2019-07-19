var mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/SENP');
mongoose.connect('mongodb+srv://mubo_9:muboObimung_9@tcommit-o0owy.mongodb.net/test?retryWrites=true&w=majority');
module.exports = mongoose;