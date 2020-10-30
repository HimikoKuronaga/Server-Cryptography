const express = require('express');
const fileUpload = require('express-fileupload');

const { affVerify, affEnc, affDec } = require('./../../helpers/affine');
const { vigVerify, vigEnc, vigDec } = require('./../../helpers/vigenere');

const {remove} = require('./../../helpers/files');

const app = express();
app.use(fileUpload({useTempFiles:false}));

app.post('/affine/file/encrypt', (req, res)=>{
	let body = req.body;
	let a = parseInt(body.a);
	let b = parseInt(body.b);
	let ring = parseInt(body.ring);

	if(!ParamsVerify(a, b, ring)){
		return res.status(400).json({
			ok: false,
			err:'No enviaste las llaves adecuadas para cifrar el archivo con el algoritmo affine'
		});
	}

	if(!req.files){
		return res.status(400)
			.json({
				ok: false,
				err: 'No se ha envio ningun archivo' 
			});
	}

	let file = req.files.file;
	let extension = file.name.split('.');
	if(extension[1] !== 'txt' ){
		return res.status(500).json({
			ok: false,
			err:'Extension del archivo invalida'
		});
	}

	file.mv(`uploads/${file.name}`, (err)=>{
		if(err)
			return res.status(500).json({
					ok: false,
					err
			});
		affEnc( a, b, ring, file.name )
			.then( encFile => { 
				res.download( `uploads/${encFile}`, (err)=>{
						if(!err){
							try{
								remove( file.name );
								remove( encFile );
							}catch(err){
								console.log(err);
							}
						}
				});
			})
			.catch( err => {
				res.status(500).json({
					ok: false,
					err,
					message:`No se pudo cifrar el archivo ${file.name}`
				});
			});
	});	
});

app.post('/affine/file/decrypt', (req, res)=>{
	let body = req.body;
	let a = parseInt(body.a);
	let b = parseInt(body.b);
	let ring = parseInt(body.ring);

	if(!ParamsVerify(a, b, ring)){
		return res.status(400).json({
			ok: false,
			err:'No enviaste las llaves adecuadas para cifrar el archivo con el algoritmo affine'
		});
	}

	if(!req.files){
		return res.status(400)
			.json({
				ok: false,
				err: 'No se ha envio ningun archivo' 
			});
	}

	let file = req.files.file;
	let extension = file.name.split('.');
	if(extension[2] !== 'txt' ){
		return res.status(500).json({
			ok: false,
			err:'Extension del archivo invalida'
		});
	}

	if(extension[1] !== 'aff'){
		return res.status(500).json({
			ok: false,
			err:'El archivo no esta cifrado'
		});
	}

	file.mv(`uploads/${file.name}`, (err)=>{
		if(err)
			return res.status(500).json({
					ok: false,
					err
			});
			
		affDec( a, b, ring, file.name )
			.then( decFile => { 
				res.download(`uploads/${decFile}`, err=>{
					if(!err){
						try{	
							remove( file.name );
							remove( decFile );
						}catch(err){
							console.log(err);
						}
					}
				});
			})
			.catch( err => {
				res.status(500).json({
					ok: false,
					err: `No se pudo decifrar el archivo ${file.name}`
				});
			});
	});	
});

app.post('/vigenere/file/encrypt', (req, res)=>{
	let body = req.body;
	let key = body.key;

	if( !vigVerify( key )){
		return res.status(400).json({
			ok: false,
			err:'No enviaste las llaves adecuadas para cifrar el archivo.'
		});
	}
	
	if(!req.files){
		return res.status(400)
			.json({
				ok: false,
				err: 'No se ha envio ningun archivo' 
			});
	}

	let file = req.files.file;
	let extension = file.name.split('.');
	if(extension[1] !== 'txt' ){
		return res.status(500).json({
			ok: false,
			err:'Extension del archivo invalida'
		});
	}

	file.mv(`uploads/${file.name}`, (err)=>{
		if(err)
			return res.status(500).json({
					ok: false,
					err
			});
			
		vigEnc( key, file.name )
			.then( encFile => { 
				res.download(`uploads/${encFile}`, (err)=>{
						if(!err){
							try{
								remove( file.name );
								remove( encFile );
							}catch(err){
								console.log(err);
							}
						}
				});
			})
			.catch( err => {
				res.status(500).json({
					ok: false,
					err,
					message:`No se pudo cifrar el archivo ${file.name}`
				});
			});
	});	
});

app.post('/vigenere/file/decrypt', (req, res)=>{
	let body = req.body;
	let key = body.key;

	if( !vigVerify( key )){
		return res.status(400).json({
			ok: false,
			err:'No enviaste las llaves adecuadas para cifrar el archivo.'
		});
	}
	
	if(!req.files){
		return res.status(400)
			.json({
				ok: false,
				err: 'No se ha envio ningun archivo' 
			});
	}

	let file = req.files.file;
	let extension = file.name.split('.');

	if(extension[2] !== 'txt' ){
		return res.status(500).json({
			ok: false,
			err:'Extension del archivo invalida'
		});
	}

	if(extension[1] !== 'vig'){
		return res.status(500).json({
			ok: false,
			err:'El archivo no esta cifrado'
		});
	}

	file.mv(`uploads/${file.name}`, (err)=>{
		if(err)
			return res.status(500).json({
					ok: false,
					err
			});
			
		vigDec( key, file.name )
			.then( encFile => { 
				res.download(`uploads/${encFile}`, (err)=>{
						if(!err){
							try{
								remove( file.name );
								remove( encFile );
							}catch(err){
								console.log(err);
							}
						}
				});
			})
			.catch( err => {
				res.status(500).json({
					ok: false,
					err,
					message:`No se pudo cifrar el archivo ${file.name}`
				});
			});
	});	
});

const ParamsVerify = (a, b, ring) => {
	if( typeof a === 'number' && typeof b === 'number' && typeof ring === 'number'){
		if( affVerify(a, b, ring) === 3){
			return true;			
		}
	}
	return false;
}

module.exports = app;
