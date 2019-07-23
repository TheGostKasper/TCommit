var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    email: { type: String, required: true },
    phone: { type: String, required: false },
    password: { type: String, required: false },
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: { lat: String, lng: String }, required: false },
    price_night: { type: Number, required: true },
    short_describtion: { type: String, required: false },
    describtion: { type: String, required: false },
    available: { type: Boolean, required: false },
    rate: { type: Number, default: 5 },
    check_in: { type: Date, required: false },
    check_out: { type: Date, required: false },
    extra: {
        images: {
            type: [{
                url: String
            }], required: false
        },
        checks: {
            type: [{
                check_in: Date,
                check_out: Date
            }], require: false
        },
        features: {
            type: [{
                name: String,
                coast: Number,
                detail: String
            }], required: false
        },
        information: {
            type: [{
                key: String,
                value: [{
                    name: String
                }]
            }], required: false
        },
        rooms: {
            type: [{
                guests: Number,
                children: Number,
                price_night: Number,
                describtion: String,
                available: Boolean,
                name: String,
                facilities: [{
                    name: String
                }],
                images: [{
                    url: String
                }]
            }]
        }
    },

    created_at: { type: Date, required: false },
    updated_at: Date,
});
hotelSchema.pre('save', (next) => {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
