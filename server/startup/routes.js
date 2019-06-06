module.exports = function (app) {
    var middleware = require(`./../common/middleware.js`)(app);
    var hotel = require(getUrl('hotel'))(app)
    var room = require(getUrl('room'))(app)
    var reservation = require(getUrl('reservations'))(app)
    var hotel = require(getUrl('helper'))(app)
    var user = require(getUrl('user'))(app)
    var registrations = require(getUrl('registration'))(app)


    function getUrl(ctrl) {
        return `./../controllers/${ctrl}/${ctrl}-ctrl.js`;
    }
}