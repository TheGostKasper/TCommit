const Room = require('./room-modal');

module.exports = function (app) {
    app.post('/api/room', (req, res) => {
        addRoomAsync(req.body, res).then((_dt) => {
            getLastAsync().then(data => {
                res.send({ data: data, message: "Room added successfully" });
            }).catch(err => {
                res.send({ data: null, err: err });
            });
        }).catch(err => console.log(err));
    }); 
    app.get('/api/room', (req, res) => {
        getRoomAsync().then(data => {
            res.send({ data: data, message: "Room found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.post('/api/room/search', (req, res) => {
        getRoomAsync({
            $or: [
                { 
                    $or: [{ name: { "$regex": `${req.body.name}`, "$options": "i" } }],
             }
            ]
        }).then(data => {
            res.send({ data: data, message: "Room found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/room/hotel/:id', (req, res) => {
        getRoomAsync({ hotel: req.params.id }).then(data => {
            res.send({ data: data, message: "Rooms found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/room/:id', (req, res) => {
        getRoomAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Room found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/room/:id', (req, res) => {
        try {
            Room.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, objs) {
                if (err) {
                    res.send({ data: null, err: err });
                } else {
                    res.send({ data: objs, message: "Room updated successfully" })
                }

            });
        } catch (error) {
            res.send({ data: null, err: err });
        }

    });
    app.delete('/api/room/:id', (req, res) => {

        try {
            Room.findOneAndRemove({ _id: req.params.id }, function (err, objs) {
                if (err) { res.send({ data: null, err: err }); }
                else {
                    res.send({ data: objs, message: "Room removed successfully" })
                }
            });
        } catch (error) {
            res.send({ data: null, err: error });
        }
    })

    // Images 
    app.post('/api/room/image/:id', (req, res) => {

        addSubArray(req.params.id, { "extra.images": req.body.extra.images })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.images').then(_dt => {
                    res.send({ data: _dt, message: "Image sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.put('/api/room/image/:id', (req, res) => {
        updateSubArray(req.params.id, { "extra.images": req.body.extra.images })
            .then((data) =>
                res.send({ data: data, message: "Images Updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/room/image/:id', (req, res) => {
        delSubArray({ "extra.images": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Image deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    async function delSubArray(option) {
        return await Room.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Room.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    async function updateSubArray(id, option) {
        return await Room.findOneAndUpdate({ _id: id }, {
            $set: option
        }).exec();
    }

    async function getLastAsync() {
        try {
            return await Room.find({}).sort({ _id: -1 }).limit(1).exec();
        } catch (error) {
            res.send({ data: null, err: error });
        }
    }
    async function getLastSubAsync(id, query) {
        try {
            return await Room.find({ _id: id }).select(query).sort({ _id: -1 }).limit(1).exec();
        } catch (error) {

        }
    }
    async function addRoomAsync(obj, res) {
        try {
            return await new Room(obj).save(function (error, results) {
                if (error) res.send({ data: null, err: error });;
                return results;
            });
        } catch (error) {
            return res.send({ data: null, err: error });;
        }

    }

    async function getRoomAsync(option) {
        try {
            return await Room.find(option).populate('hotel').exec();
        } catch (error) {
            return error;
        }
    }
   
}