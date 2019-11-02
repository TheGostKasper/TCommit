const Reservations = require('./reservations-modal');
var nodemailer = require('nodemailer');

module.exports = function (app) {
    app.post('/api/reservations', (req, res) => {
        addReservationsAsync(req.body, res).then((_dt) => {
            getLastAsync().then(data => {
                res.send({ data: data, message: "Reservations added successfully" });
            }).catch(err => {
                res.send({ data: null, err: err });
            });
        }).catch(err => console.log(err));
    });
    app.get('/api/reservations', (req, res) => {
        getReservationsAsync().then(data => {
            res.send({ data: data, message: "Reservations found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.get('/api/confirm/reservations/:email', (req, res) => {
        getReservationsAsync({ email: req.params.email }).then(data => {
            res.send({ data: data, message: "Reservations found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.get('/api/reservations/hotel/:id', (req, res) => {
        getReservationsAsync({ hotel: req.params.id }).then(data => {
            res.send({ data: data, message: "Reservationss found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/reservations/:id', (req, res) => {
        getReservationsAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Reservations found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/reservations/:id', (req, res) => {
        try {
            Reservations.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, objs) {
                if (err) {
                    res.send({ data: null, err: err });
                } else {
                    res.send({ data: objs, message: "Reservations updated successfully" })
                }

            });
        } catch (error) {
            res.send({ data: null, err: err });
        }

    });
    app.delete('/api/reservations/:id', (req, res) => {

        try {
            Reservations.findOneAndRemove({ _id: req.params.id }, function (err, objs) {
                if (err) { res.send({ data: null, err: err }); }
                else {
                    res.send({ data: objs, message: "Reservations removed successfully" })
                }
            });
        } catch (error) {
            res.send({ data: null, err: error });
        }
    })

    app.post('/api/reservtions/email', (req, res) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'reservations@summitstravel.com',
                    pass: 'summit. 9'
                }
            });

            var mailOptions = {
                from: 'reservations@summitstravel.com',
                to: req.body.toEmail,
                subject: 'Email Confirmation',
                html: req.body.bodyEmail
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send({ data: null, err: error });
                } else {
                    res.send({ data: info.response,message: "Email Sent successfully" });
                }
            });
        } catch (error) {
            res.send({ data: null, err: error });
        }
    })
    async function getLastAsync() {
        try {
            return await Reservations.find({}).sort({ _id: -1 }).limit(1).exec();
        } catch (error) {
            res.send({ data: null, err: error });
        }
    }
    async function addReservationsAsync(obj, res) {
        try {
            return await new Reservations(obj).save(function (error, results) {
                if (error) res.send({ data: null, err: error });;
                return results;
            });
        } catch (error) {
            return res.send({ data: null, err: error });;
        }

    }

    async function getReservationsAsync(option) {
        try {
            return await Reservations.find(option).populate('room').populate('hotel').exec();
        } catch (error) {
            return error;
        }
    }

}