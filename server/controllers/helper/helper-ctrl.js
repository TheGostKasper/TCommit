var fs = require('fs');

module.exports = function (app) {

    // Images 
    app.post('/api/upload/images', (req, res) => {
        uploadImage(req.body).then(_dt => {
            res.send({ data: `${req.body.id}.png`, message: "Image Uploaded successfully" })
        }).catch(err => {
            res.send({ data: null, err: err })
        })
    })

    async function uploadImage(req) {
        var data = req.image.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer.from(data, 'base64');
        return await fs.writeFileSync(`./images/${req.id}.png`, buf, { encoding: 'base64' });
    }
}