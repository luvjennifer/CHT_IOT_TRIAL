var DeviceObj = require('./objects/deviceObj');
var SensorObj = require('./objects/sensorObj');
var RawDataObj = require('./objects/rawdataObj');
var SnapshotObj = require('./objects/snapshotObj');
var SheetObj = require('./objects/sheetObj');
var RecordObj = require('./objects/recordObj');
var SheetColumnObj = require('./objects/sheetColumnObj');
var DeviceMgr = require('./controllers/DeviceMgr');
var SensorMgr = require('./controllers/SensorMgr');
var RawDataMgr = require('./controllers/RawDataMgr');
var SnapshotMgr = require('./controllers/SnapshotMgr');
var SheetMgr = require('./controllers/SheetMgr');
var RecordMgr = require('./controllers/RecordMgr');

/**test device data */
var deviceobj = new DeviceObj();
deviceobj.name = "test_add_01";
deviceobj.desc = "test_add_desc01";
deviceobj.type = 'general';
deviceobj.id = '99';
 var deviceMgr = new DeviceMgr(deviceobj);
//deviceMgr.getDevice();
//deviceMgr.deleteDevice();

//deviceMgr.modifyDevice(JSON.stringify(deviceobj));
//deviceMgr.addDevice(JSON.stringify(deviceobj));

/**test sensor data */
// var deviceobj = new DeviceObj();
// deviceobj.id = '100';
var sensorobj = new SensorObj();
sensorobj.id = 'temperature4';
sensorobj.desc = 'test_modify_temperature3';
sensorobj.type = 'gauge';
var sensorMgr = new SensorMgr(deviceobj, sensorobj);
//sensorMgr.getAllSensors();
//sensorMgr.getSensorInfo();
// console.log("modify data = " + JSON.stringify(sensorobj));
//sensorMgr.modifySensor(JSON.stringify(sensorobj));
//sensorMgr.deleteSensor();
//sensorMgr.addSensor(JSON.stringify(sensorobj));

/**test raw data */
var rawdata = new RawDataObj();
var rawdataArray = new Array();
rawdata.id= 'temperature4';
rawdata.deviceId = '99';
rawdata.value.push('kk');
rawdata.value.push('mmm');
rawdataArray.push(rawdata);
var rawdata2 = new RawDataObj();
rawdata2.id= 'temperature4';
rawdata2.time = new Date().toISOString();
rawdata2.deviceId = '99';
rawdata2.value.push('this is a door 2');
rawdataArray.push(rawdata2);
var rawdataMgr = new RawDataMgr(rawdataArray);
//console.log("rawdata = " + JSON.stringify(rawdataArray));
//srawdataMgr.addRawData(JSON.stringify(rawdataArray));
//rawdataMgr.getRawData();


var searchStartTime = '2016-05-10T00:00:00';
var searchEndTime = '2016-05-10T23:59:59';
//rawdataMgr.getRawData(searchStartTime, searchEndTime);
//rawdataMgr.deleteRawData(searchStartTime, searchEndTime);

/**test snapshot */
var snapshot = new SnapshotObj();
snapshot.device_id='99';
snapshot.id='temperature4';
snapshot.value.push('fire alarm');
snapshot.time='2016-06-13T10:43:58';
var snapshotMgr = new SnapshotMgr(snapshot);
//snapshotMgr.addSnapshot('/Users/huangcy/Desktop/pic.png');
//snapshotMgr.getSnapshot();
//snapshotMgr.downloadLatestSnapshot('download.png');
var startTime = '2016-06-13T00:43:58';
var endTime = '2016-06-13T17:33:58';
//snapshotMgr.getSnapshot(startTime, endTime);
//snapshotMgr.downloadLatestSnapshot('downloadID.png', '494727bf-f54a-4714-a799-695f12239257');
//snapshotMgr.deleteSnapshot(startTime, endTime);


/**test sheet */
var sheetObj = new SheetObj();
sheetObj.id='job';
sheetObj.name = 'job';
sheetObj.desc = 'XXXX job';
var sheetColumnObj = new SheetColumnObj();
sheetColumnObj.name = 'timestamp';
sheetColumnObj.type = 'datetime';
sheetObj.columns.push(sheetColumnObj);
var sheetColumnObj1 = new SheetColumnObj();
sheetColumnObj1.name = 'part';
sheetColumnObj1.type = 'string';
sheetObj.columns.push(sheetColumnObj1);
var sheetColumnObj2 = new SheetColumnObj();
sheetColumnObj2.name = 'lot';
sheetColumnObj2.type = 'string';
sheetObj.columns.push(sheetColumnObj2);
var sheetColumnObj3 = new SheetColumnObj();
sheetColumnObj3.name = 'run';
sheetColumnObj3.type = 'integer';
sheetObj.columns.push(sheetColumnObj3);


var sheetMgr = new SheetMgr(deviceobj);
//sheetMgr.modifySheet(JSON.stringify(sheetObj));
// sheetMgr.getSheet('job');
//sheetMgr.deleteSheet('job');


/**test record */
var recordMgr = new RecordMgr(deviceobj);
var record = new RecordObj();
record.id = 'job';
record.time = '2016-06-14T13:22:55.086';
record.value = {  
        "lot": "20160309-1-1",  
        "part": "CHTL-0001",  
        "run": "32767",  
        "timestamp": "2016-03-29T13:22:55.086"  
    } ;
var recordArray = new Array();
recordArray.push(record);
//recordMgr.addRecord(JSON.stringify(recordArray));
var startTime = '2016-03-01T05:20:55.086';
var endTime = '2016-06-14T06:22:55.086';
//recordMgr.getRecord('job', startTime, endTime);
recordMgr.getRecord('job');
//recordMgr.deleteRecord('job', startTime, endTime);