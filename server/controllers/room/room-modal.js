var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    adults: Number,
    children: Number,
    price_night: Number,
    bed_no: Number,
    describtion: String,
    available: Boolean,
    rate: { type: Number, default: 5 },
    hotel: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Hotel' },
    extra: {
        images: [{ url: String }],
        facilities: [{ name: String }],
        transactions: [{
            user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
            check_in: String,
            check_out: String,
        }]
    },
    created_at: { type: Date, required: false },
    updated_at: Date,
});
roomSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var room = mongoose.model('Room', roomSchema);
module.exports = room;
