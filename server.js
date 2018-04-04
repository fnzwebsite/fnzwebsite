var express = require('express'),
    debug = true,
    http = require('http'),
    cors = require('cors'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    api_host = 'localhost',
    //api_host='ec2-35-178-56-52.eu-west-2.compute.amazonaws.com'
    io = require('socket.io').listen(server.listen(port), {log: debug});
moment = require('moment');
var async = require('async');


io.set('log level', 1);
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
server.get('/dealing', (req, res) => {
    let auth = req.headers.authorization;
    getDealing(function (data) {
        res.send(data);
    }, auth);
});

server.get('/price/:date/:day', (req, res) => {

    var checkDate;
    if (req.params.day == 'today') {
        checkDate = moment().add('days', 2).format("YYYY-MM-DD");
    } else if (req.params.day == 'next') {
        checkDate = moment().add('days', 1).format("YYYY-MM-DD");
    } else if (req.params.day == 'previous') {
        checkDate = moment().add('days', -1).format("YYYY-MM-DD");
    }

    var priceData = [];
    let auth = req.headers.authorization;
    getDealing(function (data) {
        async.forEachOf(data, function (elem, key, callback) {
                getPriceByKeyDate(function (priceDataRes) {
                    if (moment(elem.boxDate).isSame(checkDate, 'day')) {
                        priceData.push({
                            'price': priceDataRes.price,
                            'units': elem.units,
                            'dealType': elem.dealType,
                            'day': req.params.day,
                            'amount': elem.amount,
                            'instrumentKey': elem.instrumentKey,
                            'boxDate': elem.boxDate

                        });

                    }
                    callback()
                }, elem.instrumentKey, req.params.date, auth);
            },
            function (err) {
                res.send(priceData);
            }
        )
    }, auth);
});

var clients = {};

io.use(function (socket, next) {
    if (socket.handshake.query.auth) {
        setInterval(function () {
            getDealing(function (data) {
                if (data.status != 400) {
                    io.sockets.emit('dealing', data);
                }
            }, socket.handshake.query.auth);
            return next();
        }, 10000);
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
    socket.on('dealing', function () {
        console.log(socket.handshake.query);
        getDealing(function (data) {
            io.sockets.emit('dealing', data);
        });
    }, socket.handshake.query);
    socket.on('disconnect', function () {
        delete clients[socket.id];
        io.sockets.emit('connected_clients', _.size(clients));
    });
});

// // Update locations every minutes
// setInterval(function(socket)
// {
//     console.log(socket.handshake.query)
//     if (_.size(clients) == 0) {
//         return;
//     }
//     getCourses(function(data){
//         console.log(socket.handshake.query.token);
//         io.sockets.emit('dealing', data);
//     },socket.handshake.query);
// }, 500);


// setInterval(function(){
//     io.sockets.emit('date', {'date': new Date()});
// }, 1000);


function getDealing(callback, auth) {
    var options = {
        method: 'GET',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/dealing',
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
            var obj = JSON.parse(output);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}


function getPriceByKeyDate(callback, instrumentKey, date, auth) {
    var options = {
        method: 'GET',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/price/' + instrumentKey + '/' + date,
        headers: {
            Authorization: auth
        }
    };

    var req1 = http.request(options, function (res) {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });

    req1.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req1.end();
}
