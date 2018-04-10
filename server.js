var express = require('express'),
    debug = true,
    http = require('http'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    io = require('socket.io').listen(server.listen(port), {log: debug}),
    momenttz = require('moment-timezone');

var setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();

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

server.get('/price', (req, res) => {
    var priceData = [];
    let auth = req.headers.authorization;
    getPriceByKeyDate(function (priceDataRes) {
        res.send(priceDataRes);
    }, auth);
});

var clients = {};

io.use(function (socket, next) {
    if (socket.handshake.query.auth) {
        setInterval(function () {
            getDealingByDate(function (data) {
                if (data.status != 400) {
                    io.sockets.emit('dealingbydate', data);
                }
            }, socket.handshake.query.auth,setDate);
            setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();
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
    socket.on('dealingbydate', function (msg) {
        getDealingByDate(function () {
            io.sockets.emit('dealingbydate', data);
        }, msg['query'], setDate);
        setDate = momenttz.tz(momenttz.now(), "Europe/London").format();
    });

    socket.on('disconnect', function () {
        delete clients[socket.id];
        io.sockets.emit('connected_clients', _.size(clients));
    });
});

function getDealingByDate(callback, auth, setDate) {

    var post_data = '{"selector": {"tradeDate": {"$gt": "'+setDate+'"}}}';
    var options = {
        method: 'POST',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/dealquery',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/json'
        }
    };
    console.log(post_data)
    var req = http.request(options, function (res) {
        var output = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function () {
            console.log(output);
            var obj = JSON.parse(output);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });


    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(post_data);
    req.end();
}

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

function getPriceByKeyDate(callback,auth) {
    var options = {
        method: 'GET',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/price',
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
