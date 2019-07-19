var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    fullname: String,
    firstname: String,
    lastname: String,
    email:String,
    phone:String,
    cardnumber:String,
    cvv:String,
    expiration:String,
    country:String,
    city:String,
    cardType:String,
    check_in:Date,
    check_out:Date,
    noNight:String,
    noRooms:String,
    guests:Array,
    roomType:Number,
    status: String,
    days:Number,
    modified:Boolean,
    hotelName:String,
    price_night:String,
    billing_address:String,
    room: { type: mongoose.Schema.Types.ObjectId, required: false, ref:'Room' },
    hotel: { type: mongoose.Schema.Types.ObjectId, required: false, ref:'Hotel' },
    created_at: { type: Date, required: false },
    updated_at: Date,
});
reservationSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate; 

    next();
});

var reservations = mongoose.model('Reservations', reservationSchema);
module.exports = reservations;
