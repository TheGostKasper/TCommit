"use strict";
const express = require("express");
const compression = require("compression");
const path =require("path");
const fs =require("fs");
const _port = 4100;
const _app_folder = 'dist/tcommit';

const http = require('http');
const app = express();
const server = http.createServer(app);
app.use(compression());


// ---- SERVE STATIC FILES ---- //
let template = fs.readFileSync(path.join(__dirname, '..','app/'+ _app_folder, 'index.html')).toString();

    app.engine('html', (_, options, callback) => {
      const opts = { document: template, url: options.req.url };

      renderModuleFactory(AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
    });

    app.set('view engine', 'html');
    app.set('views', 'src')
//app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));
app.get('*.*', express.static(path.join(__dirname, '..', _app_folder)));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});