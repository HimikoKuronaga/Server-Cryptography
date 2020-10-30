
const ENGLISH = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
 
const SPANISH = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

const encode = ( str, alpha ) => {
	let arr = [];
	let tmp = 0, pos = 0;
	if(alpha === 26){
		for( let i = 0; i < str.length; i++){
			pos = ENGLISH.indexOf(str[i]);
			if( pos !== -1){
				arr[tmp++] = pos;
			}
		}
	}else{
		for( let i = 0; i < str.length; i++){
			pos = SPANISH.indexOf(str[i]);
			if( pos !== -1){
				arr[tmp++] = pos;
			}
		}
	}
	return arr;
}

const decode = ( arr, alpha ) => {
	let msj = '';
	if( alpha === 26 ){
		for( let i = 0; i < arr.length; i++){
			msj += ENGLISH[arr[i]];
		}
	}else{
		for( let i = 0; i < arr.length; i++){
			msj +=  SPANISH[arr[i]];
		}
	}
	return msj;
}

const format = ( data ) =>{
	data = data.replace(/\\n/g, '\n');
	data = data.replace(/\\t/g, '\t');
	data = data.replace(/\\b/g, '\b');
	data = data.replace(/\\v/g, '\v');
	data = data.replace(/\\f/g, '\f');
	data = data.replace(/\\r/g, '\r');
	return data;
}

module.exports = {
	encode,
	decode,
	format
}
