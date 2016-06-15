var ConnectionMgr = require('./ConnectionMgr');
var Config = require('../Config');

var device;
var config = new Config();
var connectionMgr = new ConnectionMgr();
SheetMgr.prototype.setDevice = function(deviceObj){
    device = deviceObj;
}

function SheetMgr(deviceObj){
  this.setDevice(deviceObj);  
}

SheetMgr.prototype.modifySheet = function(modifySheetObj){
    //result handling
    var modifySheetListener = function networkListener(){
        console.log("modify complete");
        console.log("device id = " + device.id );
    }
    connectionMgr.setListener(modifySheetListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH);
    //get request
    connectionMgr.PUT(modifySheetObj);
}

SheetMgr.prototype.getSheet = function(sheet_id){
    //result handling
    var getSheetListener = function networkListener(sheetData){
        var jsonContent = JSON.parse(sheetData);
        console.log("success in networking");
        console.log("device id = " + device.id );
        console.log("raw data = " + sheetData);
    }
    connectionMgr.setListener(getSheetListener);
    if(sheet_id == null)
        connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH);
    else
        connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH + "/" + sheet_id);
    //get request
    connectionMgr.GET();
}

SheetMgr.prototype.deleteSheet = function(sheet_id){
    //result handling
    var delSheetListener = function networkListener(){
        console.log("delete complete");
        console.log("device id = " + device.id + ", sheet id = " + sheet_id);
    }
    connectionMgr.setListener(delSheetListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SHEET_PATH + "/" + sheet_id);
    //get request
    connectionMgr.DELETE();
}


module.exports = SheetMgr;