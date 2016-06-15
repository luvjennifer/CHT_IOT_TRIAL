var ConnectionMgr = require('./ConnectionMgr');
var DeviceObj = require('../objects/deviceObj');
var Config = require('../Config');

var config = new Config();
var device ; 
var connectionMgr = new ConnectionMgr();
function DeviceMgr(deviceObj){
    device = deviceObj;
    //this.device = null;
}


DeviceMgr.prototype.getDevice = function () {
    //result handling
    var getDeviceListener = function networkListener(deviceData){
        console.log("success in networking, data = " + deviceData);
    }
    connectionMgr.setListener(getDeviceListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id);
    //get request
    connectionMgr.GET();   
};

DeviceMgr.prototype.deleteDevice = function () {
    //result handling
    var delDeviceListener = function networkListener(){
       console.log("id = " + device.id + " delete complete");
    }
    connectionMgr.setListener(delDeviceListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id);
    //delete request
    connectionMgr.DELETE();    
};

DeviceMgr.prototype.modifyDevice = function (modifyDeviceData) {
    //result handling
    var modifyDeviceListener = function networkListener(){
       console.log("modify id = " + device.id + " Device complete");
    }
    connectionMgr.setListener(modifyDeviceListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id);
    //modify request
    connectionMgr.PUT(modifyDeviceData);    
};

DeviceMgr.prototype.addDevice = function (deviceData) {
    //result handling
    var addDeviceListener = function networkListener(id){
       console.log("add complte; id = " + id);
    }
    connectionMgr.setListener(addDeviceListener);
    connectionMgr.setPath(config.DEVICE_PATH);
    //modify request
    connectionMgr.POST(deviceData);    
};


module.exports = DeviceMgr;


