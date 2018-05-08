var express = require('express'),
    debug = true,
    http = require('http'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    io = require('socket.io').listen(server.listen(port), {log: debug}),
    momenttz = require('moment-timezone'),
    moment = require('moment');
var bodyParser = require("body-parser");
const querystring = require('querystring');

var request = require('request');


var hostIP = '35.178.56.52';

var setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2, 'hour').format();

io.set('log level', 1);
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/box/:day/acd/:acdId', (req, res) => {
    console.log("hi")
    var checkDate;
    if (req.params.day == 'today') {
        checkDate = moment().format("YYYY-MM-DD");
    } else if (req.params.day == 'next') {
        checkDate = moment().add('days', 1).format("YYYY-MM-DD");
    } else if (req.params.day == 'previous') {
        checkDate = moment().add('days', -1).format("YYYY-MM-DD");
    }
    console.log(checkDate);
    var priceData = [];
    let auth = req.headers.authorization;
    getAcd(function (data) {
        res.send(data);
    }, auth, checkDate, req.params.acdId);
});

var clients = {};

io.use(function (socket, next) {
    if (socket.handshake.query.auth) {
        setInterval(function () {
            getDealingByDate(function (data) {
                if (data.status != 400) {
                    io.sockets.emit('dealingbydate', data);
                }
            }, socket.handshake.query.auth, setDate);
            setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2, 'hour').format();
            return next();
        }, 30000);
    }
    next(new Error('Authentication error'));
});

io.set('origins', '*:*');

io.sockets.on('connection', function (socket) {

    // Add the client to the list of connected clients
    clients[socket.id] = true;

    // Broadcast to everyone the list of connected clients
    io.sockets.emit('connected_clients', _.size(clients));

    // Send the current positions to the connected client when client is ready
    socket.on('dealingbydate', function (msg) {
        getDealingByDate(function () {
            io.sockets.emit('dealingbydate', data);
        }, msg['query'], setDate);
        setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2, 'hour').format();
    });

    socket.on('disconnect', function () {
        delete clients[socket.id];
        io.sockets.emit('connected_clients', _.size(clients));
    });
});

function getDealingByDate(callback, auth, setDate) {

    var post_data = '{"selector": {"tradeTime": {"$gt": "' + setDate + '"}}}';
    var options = {
        method: 'POST',
        host: hostIP,
        port: 8081,
        path: '/api/v1/dealquery',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function (res) {
        var output = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function () {
            if (output != null) {
                console.log(output);
                var obj = JSON.parse(output);
                if (callback != undefined) {
                    callback(obj);
                }
            }
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(post_data);
    req.end();
}

function getAcd(callback, auth, dateValue, acdId) {
    console.log('/api/v1/box/' + dateValue + '/acd/' + acdId)
    var options = {
        method: 'GET',
        host: hostIP,
        port: 8081,
        path: '/api/v1/box/' + dateValue + '/acd/' + acdId,
        headers: {
            Authorization: auth
        }
    };

    var req = http.request(options, function (res) {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {

            if (output != null && output != undefined && output.length > 0) {
                var obj = JSON.parse(output);
                if (callback != undefined) {
                    callback(obj);
                }
            }
            else {
                callback([{
                    "subscriptions": 0,
                    "redemptions": 0,
                    "netFlow": 0,
                    "unitsPurchased": 0,
                    "unitsSold": 0,
                    "roundedPrice": 0
                }]);
            }
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}