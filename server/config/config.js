process.env.PORT = process.env.PORT || 4000;

Number.prototype.mod = function (n){
	return (((this%n)+n)%n);
}

String.prototype.toUnicode = function(){
	let result = '';
	for ( let i = 0; i < this.length; i++){
		result += "\\u"+("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
	}
	return result;
}

String.prototype.unicodeToChar = function (){
	return this.replace(/\\u[\dA-F]{4}/gi, 
		function (match) {
		return String.fromCharCode(parseInt(match.replace(/\\u/g,''), 16));
	});
}
