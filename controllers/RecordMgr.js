var ConnectionMgr = require('./ConnectionMgr');
var Config = require('../Config');

var device;
var config = new Config();
var connectionMgr = new ConnectionMgr();
RecordMgr.prototype.setDevice = function(deviceObj){
    device = deviceObj;
}

function RecordMgr(deviceObj){
  this.setDevice(deviceObj);  
}

RecordMgr.prototype.addRecord = function (record_data) {
    //result handling
    var addRecordListener = function networkListener(){
        console.log("add complete");
        console.log("device id = " + device.id);
    }
    connectionMgr.setListener(addRecordListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.RECORD_PATH);
    //get request
    connectionMgr.POST(record_data);
}

RecordMgr.prototype.getRecord = function(sheet_id, startTime, endTime){
    //result handling
    var getRecordListener = function networkListener(recordData){
        var jsonContent = JSON.parse(recordData);
        console.log("success in networking");
        console.log("device id = " + device.id );
        console.log("raw data = " + recordData);
    }
    connectionMgr.setListener(getRecordListener);
    if(startTime == null && endTime == null)
        connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH + "/" + sheet_id + config.RECORD_PATH);
    else{
        var path = config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH + "/" + sheet_id + config.RECORD_PATH
                   + "?start=" + startTime + "&end=" + endTime;
        connectionMgr.setPath(path);
    }
        
    //get request
    connectionMgr.GET();
}

RecordMgr.prototype.deleteRecord = function(sheet_id, startTime, endTime){
    //result handling
    var delRecordListener = function networkListener(){
        console.log("success in networking");
        console.log("device id = " + device.id +", sheet id = " + sheet_id);
        
    }
    connectionMgr.setListener(delRecordListener);
    var path = config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH + "/" + sheet_id + config.RECORD_PATH
                   + "?start=" + startTime + "&end=" + endTime;
    connectionMgr.setPath(path);
        
    //get request
    connectionMgr.DELETE();
}


module.exports = RecordMgr;