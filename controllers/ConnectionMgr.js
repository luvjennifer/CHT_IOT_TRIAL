
var http = require('http');
var events = require('events');
var FormData = require('form-data');
var eventEmitter = new events.EventEmitter();
var Config = require('../Config');
var fs = require('fs');


var config = new Config();
var listener, connectPath;
var connectPathPrefix = '';
var options = {
        host: config.hostName,
        port: '80',
        headers: {
            'CK': config.CK
        }
    };
    
//constructor    
function ConnectionMgr() {
    // this.thing = thing;
    // this.thing = null;   
}

ConnectionMgr.prototype.setPath = function(path){
    connectPath = path;
} 


ConnectionMgr.prototype.setListener = function(Listener){
    listener = Listener;
} 


ConnectionMgr.prototype.GET = function(encoding){
    options.path = connectPath;
    options.method = 'GET';    
    
    console.log("options.path = " + options.path);
    
    var callback = function(incomingMsg){
        console.log('in callback');
        console.log('status code = ' + incomingMsg.statusCode);
        var result = '';
        if(encoding != null) {
            incomingMsg.setEncoding(encoding);
        }else
            incomingMsg.setEncoding('utf-8');
        
        incomingMsg.on('data', function(data){
            // Data receiving. 
            result += data; 
        }); 
        incomingMsg.on('end', function(){
            // Data received completely.
            if(incomingMsg.statusCode != 200){
                // parseErrorMsg(result);
                console.log("in network end; return error, return = " + result);
            }else{
                // console.log("in end 200; result = " + result);
                eventEmitter.on('onResult', listener);
                eventEmitter.emit('onResult', result);
            }
                
        });
        incomingMsg.on('error', function(){
            // Data received error.
            console.log("Network Error");
        });
    }
    
    var req = http.request(options, callback);
    // req.write(postData);
    req.end();
}


ConnectionMgr.prototype.DELETE = function(){
    options.path = connectPath;
    options.method = 'DELETE';
    
    var callback = function(clientResponse){
        console.log('in callback');
        console.log('status code = ' + clientResponse.statusCode);
        var result = '';
        clientResponse.on('error', function(){
            // Data received error.
            console.log("Network Error");
        });
        clientResponse.on('data', function(data){
            // Data receiving. 
            result += data; 
        });
        clientResponse.on('end', function(){
            if(clientResponse.statusCode != 200){
                // parseErrorMsg(result);
                console.log("network error; result =" + result);
            }else{
                eventEmitter.on('onResult', listener);
                eventEmitter.emit('onResult', result);
            }    
        });
                
    }
    
    var req = http.request(options, callback);
    req.end();
    
};

ConnectionMgr.prototype.PUT = function(put_string){
    options.path = connectPath;
    options.method = 'PUT';
    
    var callback = function(clientResponse){
        console.log('in callback');
        console.log('status code = ' + clientResponse.statusCode);
        var result = '';
        clientResponse.on('error', function(data){
            // Data received error.
            console.log("Network Error");
        });
        clientResponse.on('data', function(data){
            result += data;
        });
        clientResponse.on('end', function(){
            if(clientResponse.statusCode != 200){
                // parseErrorMsg(result);
                console.log("network error; result =" + result);
            }else{
                eventEmitter.on('onResult', listener);
                eventEmitter.emit('onResult', result);
            }    
        });
    };
    
    var req = http.request(options, callback);
    req.write(put_string);
    req.end();
}

ConnectionMgr.prototype.POST = function(post_data){
    options.path = connectPath;
    options.method = 'POST';
    
    var callback = function(clientResponse){
        console.log('in callback');
        console.log('status code = ' + clientResponse.statusCode);
        var result = '';
        clientResponse.on('error', function(data){
            // Data received error.
            console.log("Network Error");
        });
        clientResponse.on('data', function(data){
            result += data;
        });
        clientResponse.on('end', function(){
            if(clientResponse.statusCode != 200){
                // parseErrorMsg(result);
                console.log("network error; result =" + result);
            }else{
                eventEmitter.on('onResult', listener);
                eventEmitter.emit('onResult', result);
            }    
        });
    };
    
    var req = http.request(options, callback);
    req.write(post_data);
    req.end();
}

ConnectionMgr.prototype.POST_FORM_DATA = function(jsonString, imgfilePath){
    // var metaString = { 
    //                id: 'temperature4',  
    //                time: "2016-06-06T10:43:58",  
    //                lat: 24.95,  
    //                lon: 121.16,  
    //                value: [ "My Test" ]
    //            };
    
    //var meta = JSON.stringify(metaString),
    var meta = jsonString,
    body = fs.readFileSync(imgfilePath),
    metaName = 'meta',
    bodyName = 'body',
    client,
    request;

    var boundaryKey = Math.random().toString(16);
  /* As per http://www.w3.org/Protocols/rfc1341/7_2_Multipart.html */
    var crlf = "\r\n",
        boundary = '---------------------------'+ boundaryKey, // Boundary: "--" + up to 70 ASCII chars + "\r\n"
        delimiter = crlf + "--" + boundary,
        preamble = "", // ignored. a good place for non-standard mime info
        epilogue = "", // ignored. a good place to place a checksum, etc
        headers = [
            'Content-Disposition: form-data; name="meta"; filename="meta.json"' + crlf,
            'Content-Type: application/json;charset=utf-8' + crlf,
        ],
        headers2 = [
            'Content-Disposition: form-data; name="body"; filename=' + imgfilePath + crlf,
            'Content-Type: image/jpeg' + crlf,
        ],
    //bodyPart = headers.join('') + crlf + data.toString(),
    //encapsulation = delimiter + crlf + bodyPart,
    closeDelimiter = delimiter + "--",
    multipartBody; // = preamble + encapsulation + closeDelimiter + epilogue + crlf /* node doesn't add this */;

    console.log("head = " + new Buffer(preamble + delimiter + crlf + headers.join('') + crlf));
    console.log("meta = " + meta);
    var metaBuffer = new Buffer(meta);
    multipartBody = Buffer.concat([
        new Buffer(preamble + delimiter + crlf + headers.join('') + crlf),
        metaBuffer,
        new Buffer(preamble + delimiter + crlf + headers2.join('') + crlf),
        body,
        new Buffer(closeDelimiter + epilogue)]);
  console.log("length = " + multipartBody.length);
  
  var callback = function(clientResponse){
        console.log('in callback');
        console.log('status code = ' + clientResponse.statusCode);
        var result = '';
        clientResponse.on('error', function(data){
            // Data received error.
            console.log("Network Error");
        });
        clientResponse.on('data', function(data){
            result += data;
        });
        clientResponse.on('end', function(){
            if(clientResponse.statusCode != 200){
                // parseErrorMsg(result);
                console.log("network error; result =" + result);
            }else{
                eventEmitter.on('onResult', listener);
                eventEmitter.emit('onResult', result);
            }    
        });
    };
    
    options.path = connectPath;
    options.method = 'POST';
    options.headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;
    options.headers['Content-Length'] =  multipartBody.length;
    var req = http.request(options, callback);
    req.write(multipartBody);
    req.end();
  
}


module.exports = ConnectionMgr;