function DeviceObj(){
    this.id = '';
    this.name = '';
    this.desc = '';
    this.type = 'general';
    this.uri = '';
    this.lat = 0.0;
    this.lon = 0.0;
    this.attributes = new Array();
}

module.exports = DeviceObj;