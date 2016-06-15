var ConnectionMgr = require('./ConnectionMgr');
var Config = require('../Config');
var fs = require("fs");

var config = new Config();
var connectionMgr = new ConnectionMgr();
var snapshot;
function SnapshotMgr(snapshotObj){
    this.setSnapshot(snapshotObj);
    //this.device = null;
}

SnapshotMgr.prototype.setSnapshot = function(snapshotObj){
    snapshot = snapshotObj;
}

SnapshotMgr.prototype.addSnapshot = function(imgfilePath){
    var device_id = snapshot.device_id;
    var addSnapshotListener = function networkListener(){
        console.log("add complete!");
        console.log("device id = " + device_id + ", sensor id = " + snapshot.id);
    }
    connectionMgr.setListener(addSnapshotListener);
    connectionMgr.setPath(config.DEVICE_PATH + "/" + snapshot.device_id + config.SNAPSHOT_PATH);
    
    //get request
    delete snapshot.device_id;  //the json string doesnt require device id
    var jsonString = JSON.stringify(snapshot);
    // console.log(jsonString);
    connectionMgr.POST_FORM_DATA(jsonString, imgfilePath);   
    
}


SnapshotMgr.prototype.getSnapshot = function (startTime, endTime) {
    //result handling
    var getSnapshotListener = function networkListener(sensorImgData){
        var jsonContent = JSON.parse(sensorImgData);
        console.log("success in networking");
        console.log("device id = " + snapshot.device_id + ", sensor id = " + snapshot.id);
        console.log("raw data = " + sensorImgData);
    }
    connectionMgr.setListener(getSnapshotListener);
    if(startTime == null && endTime == null)
        connectionMgr.setPath(config.DEVICE_PATH + "/" + snapshot.device_id + config.SENSOR_PATH + "/" + snapshot.id + config.SNAPSHOT_PATH + config.SNAPSHOT_META);
    else{
        var path = config.DEVICE_PATH + "/" + snapshot.device_id + config.SENSOR_PATH + "/" + snapshot.id + config.SNAPSHOT_PATH + config.SNAPSHOT_META + "?start=" + startTime
                    + "&end=" + endTime;
        connectionMgr.setPath(path);
    }
        
    //get request
    connectionMgr.GET();
    
};

SnapshotMgr.prototype.downloadLatestSnapshot = function (downloadPath, snapshotID) {
    //result handling
    var DLSnapshotListener = function networkListener(sensorImgData){
        console.log("success in networking");
        console.log("device id = " + snapshot.device_id + ", sensor id = " + snapshot.id);
        fs.writeFile(downloadPath, sensorImgData, 'binary', function(err) {
            if (err) {
                return console.error(err);
        }});
        //console.log("raw data = " + sensorImgData);
    }
    connectionMgr.setListener(DLSnapshotListener);
    if(snapshotID == null)
        connectionMgr.setPath(config.DEVICE_PATH + "/" + snapshot.device_id + config.SENSOR_PATH + "/" + snapshot.id + config.SNAPSHOT_PATH);
    else
        connectionMgr.setPath(config.DEVICE_PATH + "/" + snapshot.device_id + config.SENSOR_PATH + "/" + snapshot.id + config.SNAPSHOT_PATH + "/" + snapshotID);
    //get request
    connectionMgr.GET('binary');
    
};

SnapshotMgr.prototype.deleteSnapshot = function (startTime, endTime) {
    //result handling
    var deleteSnapshotListener = function networkListener(sensorsData){
        console.log("delete complete");
        console.log("device id = " + snapshot.device_id + ", sensor id = " + snapshot.id);
    }
    connectionMgr.setListener(deleteSnapshotListener);
    if(startTime != null && endTime != null){
        var path = config.DEVICE_PATH + "/" + snapshot.device_id + config.SENSOR_PATH + "/" + snapshot.id + config.SNAPSHOT_PATH + config.SNAPSHOT_META + "?start=" + startTime
                    + "&end=" + endTime;
        connectionMgr.setPath(path);
    }
    //get request
    connectionMgr.DELETE();    
};

module.exports = SnapshotMgr;
