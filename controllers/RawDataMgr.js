var ConnectionMgr = require('./ConnectionMgr');
var RawDataObj = require('../objects/rawDataObj');
var Config = require('../Config');

var config = new Config();
var rawDataArray; 
var connectionMgr = new ConnectionMgr();
function RawDataMgr(rawdataArray){
    this.setRawDataArray(rawdataArray);
    //this.device = null;
}

RawDataMgr.prototype.setRawDataArray = function(rawdataArray){
    rawDataArray = rawdataArray;
}

RawDataMgr.prototype.addRawData = function (rawDataString) {
    //result handling
    var addRawDataListener = function networkListener(){ 
       console.log("add complte; device id = " + rawDataArray[0].deviceId ); 
       console.log("sensor id =  " + rawDataArray[0].id);
    }
    connectionMgr.setListener(addRawDataListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + rawDataArray[0].deviceId + config.RAWDATA_PATH);
    //ADD request
    connectionMgr.POST(rawDataString);    
};

RawDataMgr.prototype.getRawData = function (startTime, endTime) {
    //result handling
    var getRawDataListener = function networkListener(rawDataString){ 
       console.log("rawdata string = " + rawDataString);
    }
    connectionMgr.setListener(getRawDataListener);
    var path = config.DEVICE_PATH + "/" + rawDataArray[0].deviceId + "/sensor/" + rawDataArray[0].id +  config.RAWDATA_PATH;
    if(startTime != null || endTime != null){
        path = path + "?start=" + startTime + "&end=" + endTime;   
    }
    connectionMgr.setPath(path);
    //ADD request
    connectionMgr.GET();    
};


RawDataMgr.prototype.deleteRawData = function (startTime, endTime) {
    //result handling
    var deleteRawDataListener = function networkListener(){ 
       console.log("rawdata delete complete");
    }
    connectionMgr.setListener(deleteRawDataListener);
    var path = config.DEVICE_PATH + "/" + rawDataArray[0].deviceId + "/sensor/" + rawDataArray[0].id +  config.RAWDATA_PATH;
    if(startTime != null || endTime != null){
        path = path + "?start=" + startTime + "&end=" + endTime;   
    }
    connectionMgr.setPath(path);
    //ADD request
    connectionMgr.DELETE();    
};


module.exports = RawDataMgr;