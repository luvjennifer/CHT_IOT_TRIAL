function SensorObj(){
    this.id = '';
    this.name = '';
    this.desc = '';
    this.type = 'gauge';
    this.unit = '';
    this.formula = '';
    this.attributes = new Array();
}

module.exports = SensorObj;