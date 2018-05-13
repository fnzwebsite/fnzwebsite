var express = require('express'),
    debug = true,
    http = require('http'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    io = require('socket.io').listen(server.listen(port), {log: debug}),
    momenttz = require('moment-timezone'),
    moment = require('moment');
var bodyParser=require("body-parser");
const querystring = require('querystring');

var request = require('request');


var hostIP='35.178.56.52';

var setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();

io.set('log level', 1);
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post('/account',function(request,response){
    let auth = request.headers.authorization;
    let body = request.body;
    postAccount(function (data) {
        response.send(data);
    }, auth,body);
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

server.get('/box/:day/acd/:acdId', (req, res) => {
    //console.log("hi")
    // var checkDate;
    // if (req.params.day == 'today') {
    //     checkDate = moment().format("YYYY-MM-DD");
    // } else if (req.params.day == 'next') {
    //     checkDate = moment().add('days', 1).format("YYYY-MM-DD");
    // } else if (req.params.day == 'previous') {
    //     checkDate = moment().add('days', -1).format("YYYY-MM-DD");
    // }
    console.log(req.params.day);
    //console.log(checkDate);
    var priceData = [];
    let auth = req.headers.authorization;
    getAcd(function (data) {
        res.send(data);
    }, auth, req.params.day, req.params.acdId);
});

server.get('/getacd', (req, res) => {
    let auth = req.headers.authorization;
    getAllAcd(function (data) {
        res.send(data);
    }, auth);
});

server.get('/dealingbyday/:boxDate',(req,res)=>{
let auth=req.headers.authorization;
getDealingByDate(function (data) {
    if (data.status != 400) {
        io.sockets.emit('dealingbydate', data);
    }
} ,auth,req.params.boxDate);
getDealsByBoxDate(function (data) {
    if (data.status != 400) {
       // console.log("Data Recieved Box Api: "+ JSON.stringify(data))
        res.send(data);
        //io.sockets.emit('dealingbyday', req.params.boxDate);
    }
},auth,req.params.boxDate);
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
        }, 30000);
    }
    next(new Error('Authentication error'));
});

io.use(function (socket, next) {
  //console.log('hello'+socket.handshake.query.data);
    if (socket.handshake.query.auth) {
        setInterval(function () {
            getDealingByDay(function (data) {
                if (data.status != 400) {
                    io.sockets.emit('dealingbyday', data);
                }
            }, socket.handshake.query.auth,setDate);
            setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();
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
        setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();
    });

    // socket.on('dealingbyday', function (msg) {
    //     getDealsByBoxDate(function () {
    //         io.sockets.emit('dealingbyday', data);
    //     }, msg['query'], '2018-05-09');
    //     setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();
    // });

    socket.on('disconnect', function () {
        delete clients[socket.id];
        io.sockets.emit('connected_clients', _.size(clients));
    });
});

function getDealingByDate(callback, auth, setDate) {

    var post_data = '{"selector": {"tradeTime": {"$gt": "'+setDate+'"}}}';
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
            if(output!=null)
            {
                //console.log(output);
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

function getDealsByBoxDate(callback, auth, setDate) {
    console.log("BoxDate Method..." + setDate);
    var post_data = '{"selector": {"boxDate": {"$eq": "'+setDate+'"}, "docType": {"$eq": "DEA"}}}';
    console.log(post_data);
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
//            console.log("box data :"+output)
            if(output!=null)
            {
                //console.log(output);
                var obj = JSON.parse(output);
                //console.log("BoxDate output");
                //console.log(obj);
                //console.log("BoxDate output");
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

function getDealing(callback, auth) {
    var options = {
        method: 'GET',
        host: hostIP,
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
  //          console.log("dealing data: " +JSON.stringify(obj));
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

function postAccount(callback, auth, body) {
    const postData = querystring.stringify(body);
    var options = {
        method: 'POST',
        host: hostIP,
        port: 8081,
        path: '/api/v1/account',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/JSON',
            'Content-Length': postData.length
        }
    };
    //console.log(options);
    //console.log(auth);
    //console.log(body);

    var req = http.request(options, (res) => {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
            console.log(output);
        });

        res.on('end', function () {
            if(output!=null)
            {
      //          console.log(output);
                var obj = JSON.parse(output);
                if (callback != undefined) {
                    callback(obj);
                }
            }
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}

function getAllAcd(callback, auth) {
    var options = {
        method: 'GET',
        host: hostIP,
        port: 8081,
        path: '/api/v1/company',
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
            //console.log(output);
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
        host: hostIP,
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

function getAcd(callback, auth, dateValue,acdId) {
    //console.log('/api/v1/box/'+dateValue+'/organisation/'+acdId)
    var options = {
        method: 'GET',
        host: hostIP,
        port: 8081,
        path: '/api/v1/box/'+dateValue+'/organisation/'+acdId,
        headers: {
            Authorization: auth
        }
    };
    console.log('/api/v1/box/'+dateValue+'/organisation/'+acdId);

    var req = http.request(options, function (res) {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
          // if(JSON.stringify(output) === '{}'){
          //   console.log('len'+Object.keys(output).length);
          // }
          //console.log("leng"+Object.keys(output).length);
            if(Object.keys(output).length!=2)
            {
                var obj = JSON.parse(output);
        //        console.log(obj);
                if (callback != undefined) {
                    callback(obj);
                }
            }
            else {
              //console.log('else');
                callback({
                  "totalSubscription": 0,
                  "totalRedemption": 0,
                  "totalNetflow": 0,
                  "positions": []
              });
            }
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}

server.get('/getInstrument', (req, res) => {
    let auth = req.headers.authorization;
    getInstrumentAcd(function (data) {
        res.send(data);
    }, auth);
});

function getInstrumentAcd(callback, auth) {
    var options = {
        method: 'GET',
        host: hostIP,
        port: 8081,
        path: '/api/v1/instrument',
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
          //console.log(output);
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

server.get('/getAcdAccountData', (req, res) => {
    let auth = req.headers.authorization;
    getAcdAccountData(function (data) {
        res.send(data);
    }, auth);
});

function getAcdAccountData(callback, auth) {
    var options = {
        method: 'GET',
        host: hostIP,
        port: 8081,
        path: '/api/v1/account',
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
          //console.log(output);
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

server.get('/getAcdDealData', (req, res) => {
    let auth = req.headers.authorization;
    getAcdDealData(function (data) {
        res.send(data);
    }, auth);
});

function getAcdDealData(callback, auth) {
    var options = {
        method: 'GET',
        host: hostIP,
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
          //console.log(output);
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


server.post('/addCompany',function(request,response){
    let auth = request.headers.authorization;
    let body = request.body;
    postCompany(function (data) {
        response.send(data);
    }, auth,body);
});


function postCompany(callback, auth, body) {
    const postData = querystring.stringify(body);
    var options = {
        method: 'POST',
        host: hostIP,
        port: 8081,
        path: '/api/v1/company',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    // console.log(options);
    // console.log(auth);
    // console.log(body);

    var req = http.request(options, (res) => {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            //console.log(obj);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}


server.post('/addInstrument',function(request,response){
    let auth = request.headers.authorization;
    let body = request.body;
    postInstrument(function (data) {
        response.send(data);
    }, auth,body);
});


function postInstrument(callback, auth, body) {
    const postData = querystring.stringify(body);
    var options = {
        method: 'POST',
        host: hostIP,
        port: 8081,
        path: '/api/v1/instrument',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    // console.log(options);
    // console.log(auth);
    // console.log(body);

    var req = http.request(options, (res) => {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            //console.log(obj);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}


server.post('/addDeal',function(request,response){
    let auth = request.headers.authorization;
    let body = request.body;
    postDeal(function (data) {
        response.send(data);
    }, auth,body);
});


function postDeal(callback, auth, body) {
    const postData = querystring.stringify(body);
    var options = {
        method: 'POST',
        host: hostIP,
        port: 8081,
        path: '/api/v1/dealing',
        headers: {
            Authorization: auth,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    console.log(options);
    console.log(auth);
    console.log(body);

    var req = http.request(options, (res) => {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            //console.log(obj);
            if (callback != undefined) {
                callback(obj);
            }
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(postData);
    req.end();
}





function getDealingByDay(callback, auth, setDate) {

    var post_data = '{"selector": {"boxDate": {"$eq": "'+setDate+'"}}}';
    //console.log("Deal Query Post Data: " + post_data);
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
            if(output!=null)
            {
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
