var express = require('express'),
    debug = true,
    http = require('http'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    api_host = 'localhost',
    io = require('socket.io').listen(server.listen(port), {log: debug});


console.log('Node server listening on port', port);
io.set('log level', 1);

server
    .get('/', function(req, res){
        res.send('OK');
    });

var clients = {};

io.sockets.on('connection', function(socket){
    console.log('Client ' + socket.id + ' is connected');

    // Add the client to the list of connected clients
    clients[socket.id] = true;

    // Broadcast to everyone the list of connected clients
    io.sockets.emit('connected_clients', _.size(clients));

    // Send the current positions to the connected client when client is ready
    socket.on('dealing', function() {
        getCourses(function(data){
            console.log('Send locations to client ' + data);
            io.sockets.emit('dealing', data);
        });
    });



    // When a client is disconnecting, inform other clients
    socket.on('disconnect', function() {
        delete clients[socket.id];
        console.log('Client "' + socket.id + '" disconnected');
        io.sockets.emit('connected_clients', _.size(clients));
    });
});

// Update locations every minutes
setInterval(function()
{
    // Do nothing if there is no client
    if (_.size(clients) == 0) {
        return;
    }

    console.log('Update positions...');

    // Get the current courses and broadcast them to all clients
    getCourses(function(data){
        io.sockets.emit('dealing', data);
    });
}, 500);

// Update the server date every seconds
setInterval(function(){
    io.sockets.emit('date', {'date': new Date()});
}, 1000);


function getCourses(callback)
{
    var options = {
        hostname: 'http://35.178.56.52:8081/api/v1',
        path: '/dealing',
        method: 'GET'
    };


    // var options = {
    //     host: "http://35.178.56.52",
    //     port: 8081,
    //     method: "GET",
    //     path: "/api/v1/dealing"
    //     // Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjEwMzk5NjkyMzUsImVucm9sbG1lbnRJZCI6InRlc3RAZm56Y2hhaW4uY29tIiwiYWZmaWxpYXRpb24iOiJmbnouYWRtaW5pc3RyYXRvciIsIm9yZ2FuaXNhdGlvbiI6IkZueiIsInNjb3BlcyI6IkFETUlOIn0.ker4SENy8uHpcpYKB__faPp89R1MlWRGviR7-OHkDd8"
    // };

    var options = {
        method: 'GET',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/dealing',
        headers: {
            Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjEyMTM4MjI0NTEsImVucm9sbG1lbnRJZCI6InRlc3RAZm56Y2hhaW4uY29tIiwiYWZmaWxpYXRpb24iOiJmbnouYWRtaW5pc3RyYXRvciIsIm9yZ2FuaXNhdGlvbiI6IkZueiIsInNjb3BlcyI6IkFETUlOIn0.VG0lUvMD7ks3sCjBzqjaBmPtWpp0BBZ7iA9vVCoBGGg"
        }
    };

    var req = http.request(options, function(res) {
        console.log(JSON.stringify(res.headers));
        //console.log('-----------------------------------------');
        console.log('STATUS: ' + res.statusCode);
        console.log('STATUS: ' + res);
        // return req;
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            if (callback != undefined){
                callback(obj);
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}
