const Hotel = require('./hotel-modal');
const helper = require('./../../common/helper')
var fs = require('fs');

module.exports = function (app) {

    // Search Results
    app.post('/api/hotel/search', (req, res) => {
        getPagesAsync({
            query: {
                $or: [
                    { $or: [{ name: { "$regex": `${req.body.hotel}`, "$options": "i" } }] },
                    //  { $or: [{ country: { "$regex": `${req.body.hotel}`, "$options": "i" } }] },
                ]
            }, page: req.body.page, pageCount: req.body.pageCount
        }).then(data => {
            res.send({ data: data, message: "Hotel found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.get('/api/hotel/searchName/:name', (req, res) => {
        
        getSearchedHotelAsync({
            $and: [
                { $or: [{ name: { "$regex": `^${req.params.name}`} }] }
            ]
        } ).then(data => {
            res.send({ data: data, message: "Hotel found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    })

    app.post('/api/hotel/names', (req, res) => {
        searchNames({
            query: {
                $or: [
                    { $or: [{ name: { "$regex": `${req.body.hotel}`, "$options": "i" } }] }
                ]
            }, page: req.body.page, pageCount: req.body.pageCount,
            rate: req.body.rate, p_from: req.body.p_from, p_to: req.body.p_to
        }).then(data => {
            console.log(data);
            res.send({ data: data, message: "Hotel found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    })
    app.post('/api/hotel', (req, res) => {
        addHotelAsync(req.body, res).then((_dt) => {
            getLastAsync({}).then(data => {
                res.send({ data: data, message: "Hotel added successfully" });
            }).catch(err => {
                res.send({ data: null, err: err });
            });
        }).catch(err => console.log(err));
    });
    app.get('/api/hotel', (req, res) => {
        getHotelAsync().then(data => {
            res.send({ data: data, message: "Hotel found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });


    app.get('/api/hotel/:id', (req, res) => {
        getHotelAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Hotel found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/hotel/:id', (req, res) => {
        try {
            Hotel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, objs) {
                if (err) {
                    res.send({ data: null, err: err });
                } else {
                    res.send({ data: objs, message: "Hotel updated successfully" })
                }

            });
        } catch (error) {
            res.send({ data: null, err: err });
        }

    });
    app.delete('/api/hotel/:id', (req, res) => {

        try {
            Hotel.findOneAndRemove({ _id: req.params.id }, function (err, objs) {
                if (err) { res.send({ data: null, err: err }); }
                else {
                    res.send({ data: objs, message: "Hotel removed successfully" })
                }
            });
        } catch (error) {
            res.send({ data: null, err: error });
        }
    })

    // Images 
    app.post('/api/hotel/image/:id', (req, res) => {

        addSubArray(req.params.id, { "extra.images": req.body.extra.images })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.images').then(_dt => {
                    res.send({ data: _dt, message: "Image sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.put('/api/hotel/image/:id', (req, res) => {
        updateSubArray(req.params.id, { "extra.images": req.body.extra.images })
            .then((data) =>
                res.send({ data: data, message: "Images Updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/hotel/image/:id', (req, res) => {
        delSubArray({ "extra.images": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Image deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // features 
    app.post('/api/hotel/features/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.features": req.body.extra.features })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.features').then(_dt => {
                    res.send({ data: _dt, message: "Features sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/hotel/features/:id', (req, res) => {
        delSubArray({ "extra.features": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Features deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });


    //Checks
    app.post('/api/hotel/checks/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.checks": req.body.extra.checks })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.checks').then(_dt => {
                    res.send({ data: _dt, message: "Checks sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/hotel/checks/:id', (req, res) => {
        delSubArray({ "extra.checks": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Checks deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // information 
    app.post('/api/hotel/information/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.information": req.body.extra.information })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.information').then(_dt => {
                    res.send({ data: _dt, message: "Information sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.put('/api/hotel/information/:id', (req, res) => {
        updateSubArray(req.params.id, { "extra.information": req.body.extra.information })
            .then((data) =>
                res.send({ data: data, message: "Information Updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/hotel/information/:id', (req, res) => {
        delSubArray({ "extra.information": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Information deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // room 
    app.post('/api/hotel/room/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.rooms": req.body.extra.rooms })
            .then((data) =>
                getLastSubAsync(req.params.id, 'extra.rooms').then(_dt => {
                    res.send({ data: _dt, message: "Room sent successfully" })
                }).catch(err => {
                    res.send({ data: null, err: err })
                })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.put('/api/hotel/room/:id', (req, res) => {
        updateSubArray(req.params.id, { "extra.rooms": req.body.extra.rooms })
            .then((data) =>
                res.send({ data: data, message: "Room Updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/hotel/room/:id', (req, res) => {
        delSubArray({ "extra.rooms": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Room deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    async function delSubArray(option) {
        return await Hotel.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Hotel.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    async function updateSubArray(id, option) {
        return await Hotel.findOneAndUpdate({ _id: id }, {
            $set: option
        }).exec();
    }

    async function getLastAsync() {
        try {
            return await Hotel.find({}).sort({ _id: -1 }).limit(1).exec();
        } catch (error) {
            res.send({ data: null, err: error });
        }
    }
    async function getLastSubAsync(id, query) {
        try {
            return await Hotel.find({ _id: id }).select(query).sort({ _id: -1 }).limit(1).exec();
        } catch (error) {

        }
    }
    async function addHotelAsync(obj, res) {
        try {
            return await new Hotel(obj).save(function (error, results) {
                if (error) res.send({ data: null, err: error });
                return results;
            });
        } catch (error) {
            return res.send({ data: null, err: error });;
        }

    }

    async function getHotelAsync(option) {
        try {
            return await Hotel.find(option).exec();
        } catch (error) {
            return error;
        }
    }

    async function getSearchedHotelAsync(option) {
        try {
            return await Hotel.find(option).limit(5).select('name _id').exec();
        } catch (error) {
            return error;
        }
    }

    async function searchNames(option) {
        try {
            return await Hotel
                .find(option.query)
                .where('rate').gt(option.rate)
                .where('price_night').gt(option.p_from).lt(option.p_to)
                .skip((option.page - 1) * option.pageCount)
                .limit(option.pageCount)
                .exec();
        } catch (error) {

        }
    }

    
    async function getPagesAsync(option) {
        try {
           
            return await Hotel
                .find(option.query)
                .skip((option.page - 1) * option.pageCount)
                .limit(option.pageCount)
                //.select('name country')
                .exec();
        } catch (error) {

        }
    }

}