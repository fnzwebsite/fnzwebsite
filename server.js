var express = require('express'),
    debug = true,
    http = require('http'),
    _ = require('underscore'),
    server = express(),
    port = 3700,
    io = require('socket.io').listen(server.listen(port), {log: debug}),
    momenttz = require('moment-timezone'),
    moment = require('moment');
//var bodyParser = require('body-parser');

var setDate = momenttz.tz(momenttz.now(), "Europe/London").subtract(2,'hour').format();

io.set('log level', 1);
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
 server.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
server.use(bodyParser.json());server.use(function (req, res, next) {
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


server.get('/box/:day/acd/:acdId', (req, res) => {
//    console.log("hi")
    var checkDate;
    if (req.params.day == 'today') {
        checkDate = moment().format("YYYY-MM-DD");
    } else if (req.params.day == 'next') {
        checkDate = moment().add('days', 1).format("YYYY-MM-DD");
    } else if (req.params.day == 'previous') {
        checkDate = moment().add('days', -1).format("YYYY-MM-DD");
    }
  //  console.log(checkDate);
    var priceData = [];
    let auth = req.headers.authorization;
    getAcd(function (data) {
        res.send(data);
    }, auth, checkDate, req.params.acdId);
});

server.get('/getacd', (req, res) => {
  console.log('get acd data....')
    let auth = req.headers.authorization;
    getAllAcd(function (data) {
        res.send(data);
    }, auth);
});

// server.use("*",function(req,res,next){
//   res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    //other headers here
//     res.status(200).end();
// });

server.post('/postacd',(req,res)=>{
  let auth = req.headers.authorization;
  console.log('Auth: ' + auth);
  console.log('post acd....')
  postAcdData(req.body, auth);
})


function postAcdData(postData, auth) {
  //console.clear();
  console.log('postData...');
  const reqData={
    "companyType":"smt"
    ,"name":"smt80",
    "registeredAddress":{"addressLine1":"ad1","addressLine2":"ad2","city":"c1","county":"",
    "country":"","postcode":""},
    "postalAddress":{"addressLine1":"ad2","addressLine2":"ad22","city":"","county":"","country":""
    ,"postcode":""}
    ,"domicile":"","amlStatus":"","kycStatus":"",
    "relationshipManager":{"name":"TestUser","email":"test@example.com"},
    "instrumentType":"","telephone":"","fax":"","email":"","ucitisCompliant":true}

    const data = {"enrollmentId":'test2@fnzchain.com',"enrollmentSecret": 'T3sting1' };
    console.log(Buffer.byteLength(JSON.stringify(reqData)));
    var options = {
      host:'35.178.56.52',
      port: '8081',
        method: 'post',
        path: '/api/v1/company',
        body:JSON.stringify(reqData),
        headers: {
            authorization: auth,
            contentType: 'application/json',
            accept:"*/*"
            // 'Content-Length': Buffer.byteLength(JSON.stringify(reqData)),
            // 'Accept': 'application/json',
            // 'Accept-Encoding': 'gzip,deflate,sdch',
            // 'Accept-Language': 'en-US,en;q=0.8',
            // 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    };

  //   var request = require('request');
  //   var options = {
  //     uri: 'http://35.178.56.52:8081/api/v1/login'
  //     , method: 'POST'
  //     ,json: { "longUrl": "http://35.178.56.52:8081/api/v1/login" }
  //     ,body:JSON.stringify(data)
  //     ,headers: {
  //         Authorization: auth,
  //          'Content-Length': Buffer.byteLength(reqData)
  //     }
  //   };
  //   request(options, function (error, response, body) {
  //
  //     if (!error && response.statusCode == 200)
  //     { console.log(body.id) // Print the shortened url. }
  //   }
  //   else if(error) {
  //     console.log(JSON.stringify(error));
  //     //console.log(response.statusCode);
  //     //console.log(JSON.stringify(response));
  //   }
  // });
    // console.log(postData);
    var req = http.request(options, function (res) {
        var output = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function () {
          console.log(output)
          //console.log(JSON.stringify(output));
    //        var obj = JSON.parse(output);
      //      console.log(obj)
            // if (callback != undefined) {
            //     callback(obj);
            // }
        });
    });
    req.on('error', function (e) {
      console.log(JSON.stringify(e));
        console.log('problem with request: ' + e.message);
    });
    req.write(JSON.stringify(reqData));
    req.end();
}



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

io.set('origins', '*:*');

io.sockets.on('connection', function (socket) {

    if(clients!=undefined && clients!=null)
    {
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

    socket.on('disconnect', function () {
        delete clients[socket.id];
        io.sockets.emit('connected_clients', _.size(clients));
    });
  }
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
    var req = http.request(options, function (res) {
        var output = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function () {
          if(output!=null)
          {
        //    console.log(output);
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
  //console.log('inside dealing');
    //console.log(auth);

    var req = http.request(options, function (res) {
        var output = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
//          console.log(output);
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

function getAllAcd(callback, auth) {
    var options = {
        method: 'GET',
        host: '35.178.56.52',
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

            var obj = JSON.parse(output);
            //console.log(obj);
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

function getAcd(callback, auth, dateValue,acdId) {
    console.log('/api/v1/box/'+dateValue+'/acd/'+acdId)
    var options = {
        method: 'GET',
        host: '35.178.56.52',
        port: 8081,
        path: '/api/v1/box/'+dateValue+'/acd/'+acdId,
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

          if(output!=null && output!=undefined && output.length>0)
          {
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

    req.end();
}
