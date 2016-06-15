var ConnectionMgr = require('./ConnectionMgr');
var Config = require('../Config');

var sensor;
var device;
var config = new Config();
var connectionMgr = new ConnectionMgr();
SensorMgr.prototype.setDevice = function(deviceObj){
    device = deviceObj;
}

SensorMgr.prototype.setSensor = function(sensorObj){
    sensor = sensorObj;
}
function SensorMgr(deviceObj, sensorObj){
    this.setSensor(sensorObj);
    this.setDevice(deviceObj);
    // this.device = null;
}



SensorMgr.prototype.getAllSensors = function () {
    //result handling
    var getAllSensorsListener = function networkListener(sensorsData){
        var jsonContent = JSON.parse(sensorsData);
        console.log("success in networking");
        console.log("device id = " + device.id + ", sensor number = " + jsonContent.length);
        console.log("raw data = " + sensorsData);
    }
    connectionMgr.setListener(getAllSensorsListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SENSOR_PATH);
    //get request
    connectionMgr.GET();   
};

SensorMgr.prototype.getSensorInfo = function () {
    //result handling
    var getSensorListener = function networkListener(sensorsData){
        var jsonContent = JSON.parse(sensorsData);
        console.log("success in networking");
        console.log("device id = " + device.id + ", sensor id = " + sensor.id);
        console.log("raw data = " + sensorsData);
    }
    connectionMgr.setListener(getSensorListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SENSOR_PATH + "/" + sensor.id);
    //get request
    connectionMgr.GET();
    
};

SensorMgr.prototype.modifySensor = function (modifySensorData) {
    //result handling
    var modifySensorListener = function networkListener(sensorsData){
        console.log("modify complete");
        console.log("device id = " + device.id + ", sensor id = " + sensor.id);
    }
    connectionMgr.setListener(modifySensorListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SENSOR_PATH + "/" + sensor.id);
    //get request
    connectionMgr.PUT(modifySensorData);
    
};

SensorMgr.prototype.deleteSensor = function () {
    //result handling
    var deleteSensorListener = function networkListener(sensorsData){
        console.log("delete complete");
        console.log("device id = " + device.id + ", sensor id = " + sensor.id);
    }
    connectionMgr.setListener(deleteSensorListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SENSOR_PATH + "/" + sensor.id);
    //get request
    connectionMgr.DELETE();
    
};

SensorMgr.prototype.addSensor = function (sensor_data) {
    //result handling
    var addSensorListener = function networkListener(){
        console.log("add complete");
        console.log("device id = " + device.id + ", sensor id = " + sensor.id);
    }
    connectionMgr.setListener(addSensorListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + device.id + config.SENSOR_PATH + "/" + sensor.id);
    //get request
    connectionMgr.POST(sensor_data);
}

module.exports = SensorMgr;
