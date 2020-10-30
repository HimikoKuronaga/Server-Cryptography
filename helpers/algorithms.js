const Euclidean =( a, b = 128)=>{
	let res = -1;
	while( res !== 0){
		res = b % a;
		b = a;
		a = res;
	}
	return b;
}

const EuclideanExt = ( x, y ) =>{
	let so = 1, sn = 0, to = 0, tn = 1;
	let q = 0, r = -1, s, t;
	while( r !== 0){
		q = Math.floor( y / x );
		r = y % x;
		s = so - (q * sn);
		t = to - (q * tn);
		so = sn;
		sn = s;
		to = tn;
		tn = t;
		y = x;
		x = r;
	}
	return to;
}

module.exports = {
	Euclidean,
	EuclideanExt
}
