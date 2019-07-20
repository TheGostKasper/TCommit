const jwt = require('jsonwebtoken');
const User = require('./../user/user-modal');

module.exports = function (app) {
    app.post('/login', (req, res) => {
        var _body = req.body;
        console.log(_body.email)
        login(_body.type, { email: _body.email, password: _body.password })
            .then(data => {
                if (data === null) {
                    return res.json(displayError());
                }
                else {
                    return res.json({ data: data, token: getToken(data), message: "Welcome back! " });
                }
            }).catch(err => {
                return res.json(displayError());
            });
    }); 
    
    

    app.post('/signUp', (req, res) => {
        addUserAsync(req.body).then((data) => { 
            getLastAsync(req.body).then(dt => {
                res.send({ data: dt, token: getToken(dt), message: "User added successfully" });
            }).catch(err => {
                res.send(displayError(message = err));
            });
        }).catch(err => res.send(displayError(message = err)));
    })

    // get token
    function getToken(user) {
        const payload = {
            user: user
        };
        return jwt.sign(payload, app.get('superSecret'));
    }
   
    async function addUserAsync(obj) {
        return await new User(obj).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }
   
    async function getLastAsync(body) {
        try {
            return await User.findOne(body).exec();
        } catch (error) {
            res.send({ data: null, err: error });
        }
    }
    // diff login
    async function login(type, filter) {
        return await User.findOne(filter).exec();
    }

    function displayError(data = null, message = "Authentication faild, Username or password is incorect") {
        return { data: data, message: message }
    }

    // validate token

    // encrypt password


}