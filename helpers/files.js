const fs = require('fs');
const path = require('path');

const write = async( file, data) => {
	return new Promise((resolve, reject)=>{
		const filePath = path.resolve(__dirname, `../uploads/${file}`);
		fs.writeFile(filePath,  data , 'utf8', (err)=>{
			if(err)
				reject(err);
			else	
				resolve( true );
		});
	});
}

const read = ( file ) => {	
	return new Promise( (resolve, reject) => {
		const filePath = path.resolve(__dirname, `../uploads/${file}`);
		fs.readFile( filePath, 'utf8', (err, data)=>{
			if(err)
				reject(err);

			resolve( data );
		});
	});
}

const remove = ( file ) => {
	return new Promise((resolve, reject)=>{
		let filePath = path.resolve( __dirname,`../uploads/${file}` );
		fs.unlink(filePath, (err)=>{
			if(err)
				reject(err);
			else
				resolve(true);
		});
	});
}

module.exports = {
	write,
	read,
	remove
}
