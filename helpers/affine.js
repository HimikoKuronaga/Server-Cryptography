const { encode, decode, format } = require('./alphabet');
const { read, write, remove } = require('./files');
const { Euclidean, EuclideanExt } = require('./algorithms');

const affVerify = ( a, b, ring = 128 ) =>{
	let resp = 0;	

	if( a > 0){
		let gdc = Euclidean(a, ring);
		if( b >= 0 && b < ring){
			if(gdc === 1){
				return 3;
			}else{
				return 1;
			}
		}else{
			if(gdc === 1){
				return 2;
			}
		}
	}else{
		if( b >= 0 && b < ring ){
			return 1;
		}else{
			return 0;
		}
	}
}

const GenerateKey = ( ring = 128 ) => {
	let a, b;
	do{
		a = Math.floor(Math.random() * ring );
		b = Math.floor(Math.random() * ring );
	}while( Euclidean(a, ring) !== 1 )

	return [a, b, ring];
}

const EncryptText = ( a, b, ring, data ) =>{
	let arr = [];
	let newData = '';
	if( ring === 27 || ring === 26){
		data = data.toLowerCase();
		arr = encode( data, ring );
		for( let i = 0; i < arr.length; i++){
			arr[i] = (a*arr[i] + b) % ring;
		}
		newData = decode(arr, ring);
	}else{
		if(ring < 98) // Para que no haya perdida de info
			data = data.toUpperCase();
		
		for( let i = 0; i < data.length; i++){
			let ck = data.charCodeAt(i);
			ck = (((a*ck+b)%ring)+ring) % ring;
			newData += String.fromCharCode( ck );
		}
	}
	return newData;
}

const DecryptText = ( a, b, ring, data ) =>{
	let arr = [];
	let newData = '';
	a = EuclideanExt(a, ring);
	b = b === 0? 0: ring - b;
	if( ring === 26 || ring === 27){
		arr = encode( data, ring );
		let dk;
		for( let i = 0; i < arr.length; i++){
			dk = a*(arr[i]+b);
			arr[i] = ( ( dk%ring ) + ring )%ring;
		}
		newData = decode(arr, ring);
	}else{
		let ck;
		data = format(data);
		for( let i = 0; i < data.length; i++){
			ck = data.charCodeAt(i);
			ck = a*(ck+b);
			ck = ((ck%ring)+ring) % ring;
			newData += String.fromCharCode(ck);
		}		
	}
	return newData;
}

const affEnc = async( a, b, ring, file ) => {
	return new Promise((resolve, reject)=>{	
			read( file )
			.then( data => {
				let encData = EncryptText( a, b, ring, data );
				let fileOut = file.split('.')[0]+'.aff'+'.txt';
				write ( fileOut, encData  )
					.then( ok => resolve( fileOut ))
					.catch( err => reject( err ));
			})
			.catch( err => reject(err));
	});
}

const affDec = async( a, b, ring, file ) =>{
	return new Promise((resolve, reject)=>{
		read( file )
			.then( data => {
				let decData = DecryptText( a, b, ring, data );
				let fileOut = file.split('.')[0]+'.txt';
				write ( fileOut, decData  )
					.then( ok => resolve( fileOut ))
					.catch( err => reject( err ));
			})
			.catch( err => reject(err));
	});
}

module.exports = {
	affVerify,
	GenerateKey,
	affEnc,
	affDec
}
