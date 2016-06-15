var http = require('http');
var querystring = require('querystring');

// var postData = querystring.stringify({
//   'CK' : 'ZPBTFBTP7UE7U4U1'
// });

// Options to be used by request 
var options = {
   host: 'iot.cht.com.tw',
   port: '80',
   path: '/iot/v1/device',
   method: 'POST',
   headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //  'Content-Length': postData.length,
    'CK': 'ZPBTFBTP7UE7U4U1'
  }
};
options.headers['Content-Type'] = 'application/json';
var postData = JSON.stringify({  
    "name": "HygrometerNodejsCreated",  
    "desc": "Your Hygrometer",  
    "type": "general",  
    "uri": "http://a.b.c.d/xxx",  
    "lat": 24.95,  
    "lon": 121.16,  
    "attributes": [{  
        "key": "label",  
        "value": "溫濕度計"  
    },{  
        "key": "region",  
        "value": "Taiwan"  
    }]  
} );
//options.headers['Content-Length'] = postData.length;


var callback = function(incomingMsg){
    console.log('in callback');
    console.log('status code = ' + incomingMsg.statusCode);
    var result = '';
    incomingMsg.on('data', function(data){
        // Data received completely.
        result += data; 
    }); 
    incomingMsg.on('end', function(){
        // Data received completely.
        console.log("in end; result = " + result);
    });
   incomingMsg.on('error', function(){
        // Data received completely.
        console.log("in error" + incomingMsg);
    });
   incomingMsg.on('close', function(){
        // Data received completely.
        console.log("in close" + incomingMsg);
    });
}

var req = http.request(options, callback);
req.write(postData);
req.end();

