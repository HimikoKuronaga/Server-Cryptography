const { read, write, remove } = require('./files');
const { encode, decode } = require('./alphabet');

const vigVerify = ( key ) => {

	if( key.length === 0)
		return false;
		
	let lenKey = key.length;
	if( lenKey === encode( key ).length )
		return true;

	return false;
}

const EncryptText = ( key, data, alpha = 26 ) =>{
	data = data.toLowerCase();
	let arr = encode( data , alpha );
	let arrKey = encode( key, alpha );
	let keyLen = arrKey.length;

	for( let i = 0; i < arr.length ; i++){
		let ck = (arr[i] + arrKey[ i % keyLen ]) % alpha;			
		arr[i] = ck;
	}

	return decode( arr, alpha );
}

const DecryptText = ( key, data, alpha = 26) =>{

	let arr = encode( data , alpha );
	let arrKey = encode( key, alpha );
	let keyLen = arrKey.length;
	
	arrKey = arrKey.map( (val, index) =>{
		return val === 0? 0: alpha - val;
	});
	
	let ck = 0;
	for( let i = 0; i < arr.length ; i++){
		ck = (arr[i] + arrKey[i % keyLen]) % alpha;		
		arr[i] = ck;
	}
	
	return decode( arr, alpha );
}

const vigEnc = ( key, file, alpha = 26) =>{
	return new Promise((resolve, reject) => {
		read( file )
			.then( data => {
				let encData = EncryptText( key, data );
				let fileOut = file.split('.')[0]+'.vig'+'.txt';
				write( fileOut, encData )
					.then( ok => resolve( fileOut ))
					.catch( err => reject( err ));
			}).catch( err => reject(err));
	});
}

const vigDec = ( key, file, alpha = 26 ) =>{
	return new Promise((resolve, reject) => {
		read( file )
			.then( data => {
				let decData = DecryptText( key, data );
				let fileOut = file.split('.')[0]+'.txt';
				write( fileOut, decData )
					.then( ok => resolve( fileOut ))
					.catch( err => reject( err ));
			}).catch( err => reject(err));
	});
}

module.exports  = {
	vigEnc,
	vigDec,
	vigVerify
};
