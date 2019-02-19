'use strict';

var express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    morganLogger = require('./morgan'),
    winston = require('./winston'),
    helmet = require('helmet'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    cors = require("../config/cors");


module.exports = function (db) {
    // Initialize app
    var app = express();

    // Cors enabled
    app.use(cors);

    // Add Headers
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', '*');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;


    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // Enable logger (morgan)
    if (process.env.NODE_ENV !== 'test')
        app.use(morgan(morganLogger.getMorganLogFormat(), morganLogger.getMorganLogOptions()));


    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Use helmet to secure Express headers
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    // app.use('/apidoc', express.static(path.resolve('./apidocs')));
    app.use(express.static(path.resolve('./assets')));


    // Registering the all Mongoose Schemas
    // config.getGlobbedFiles('./app/models/**/*.js').forEach(function (modelPath) {
    //     require(path.resolve(modelPath));
    // });

    // Globing routing files
    // config.getGlobbedFiles("./app/routes/**/*.js").forEach(function (routePath) {
    //     require(path.resolve(routePath))(app);
    // });

    // Api for server status
    app.get('/', function (req, resp) {
        winston.info("GET /");
        let env = process.env.NODE_ENV;
        if (env === 'dev' || env === 'test') {
            resp.status(200).json({
                status: 'Server is running on http://localhost:' + config.port,
                env: process.env.NODE_ENV
            })
        } else {
            resp.status(200).json({
                status: config.host + ' is running.',
                message: 'Welcome to my API',
                env: env
            });
        }

    });

    // Assume 404 since no middleware responded
    app.use(function (req, resp) {
        resp.status(404).send({
            url: req.originalUlr,
            error: 'Not Found'
        });
    });

    // Return Express server instance
    return app;
};
