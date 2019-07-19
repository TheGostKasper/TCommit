const User = require('./user-modal');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    app.post('/api/user', (req, res) => {
        addUserAsync(req.body).then((_dt) => {
            getLastAsync(req.body).then(data => {
                res.send({ data: data, message: "User added successfully" });
            }).catch(err => {
                res.send({ data: null, err: err });
            });
        }).catch(err => console.log(err));
    });
    app.post('/api/user/signin', (req, res) => {
        getUserAsync({email:req.body.email,password:req.body.password}).then(data => {
            res.send({ data: data, message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

   

    app.get('/api/user', (req, res) => {
        getUserAsync({type:"User"}).then(data => {
            res.send({ data: data, message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/user/:id', (req, res) => {
        getUserAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.post('/api/user/filterBy', (req, res) => {
        getUserAsync(req.body).then(data => {
            res.send({ data: data, message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    // app.post('/api/user/filter', (req, res) => {
    //     getUserFilterAsync(req.body).then(data => {
    //         res.send({ data: data, message: "User found" });
    //     }).catch(err => {
    //         res.send({ data: null, err: err });
    //     });
    // });

    app.post('/api/user/manage', (req, res) => {
        getUserAsync({email:req.body.email,password:req.body.password}).then(data => {
            res.send({ data: data,token: getToken(data), message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, objs) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: objs, message: "User updated successfully" })
            }

        });
    });
    app.delete('/api/user/:id', (req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, function (err, objs) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: objs, message: "User removed successfully" })
            }
        });
    })

    // Shift Areas 
    app.post('/api/user/transactions/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.transactions": req.body.extra.transactions })
            .then((data) =>
                res.send({ data: data, message: "Transactions sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/user/transactions/:id', (req, res) => {
        delSubArray({ "extra.transactions": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Transactions deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    async function delSubArray(option) {
        return await User.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await User.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    async function addUserAsync(obj) {
        return await new User(obj).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function getUserAsync(option) {
        return await User.find(option).exec();
    }
    async function getLastAsync(body) {
        try {
            return await User.findOne(body).exec();
        } catch (error) {
            res.send({ data: null, err: error });
        }
    }
     // get token
     function getToken(user) {
        const payload = {
            user: user
        };
        return jwt.sign(payload, app.get('superSecret'));
    }
}