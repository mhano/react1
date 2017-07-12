
export class AccelerometerData extends Object {
	x = 0;
	y = 0;
	z = 0;
	
	constructor(xyzdata) {
		super();
		if(xyzdata && xyzdata.x && xyzdata.y && xyzdata.z){
			this.x = this.round(xyzdata.x);
			this.y = this.round(xyzdata.y);
			this.z = this.round(xyzdata.z);
		}
	}
	
	equals = function(accelerometerData) {
		let result = 
			Math.abs(this.x - accelerometerData.x) < 0.01 && 
			Math.abs(this.y - accelerometerData.y) < 0.01 && 
			Math.abs(this.z - accelerometerData.z) < 0.01;
		
		return result;
	}
	
	round = function(n) {
	  if (!n) {
		return 0;
	  }

	  return Math.round(n * 10000) / 10000;
	}
}
