const express = require('express');
const { vigVerify } = require('./../../helpers/vigenere');

const app = express();

app.get('/vigenere/verify', (req, res)=>{
	
	let key = req.query.key || false;

	if( !key )
		return res.status(400).json({ ok: false, err: 'No enviaste la llave' });
		
	if( vigVerify(key) ){
		res.json({
			ok: true
		});
	}else{
		res.json({
			ok: false
		});
	}

});

app.get('/vigenere/key', (req, res)=>{
	let len = Math.floor(Math.random() * 11 + 10);

	let key = '';
	let randomChar = 0;
	for( let i = 0; i < len; i++){
		randomChar = Math.floor( Math.random()* 26)+97 ;
		key+=String.fromCharCode( randomChar );
	}
	
	res.json({
		ok:true,
		key
	});

});

module.exports = app;
