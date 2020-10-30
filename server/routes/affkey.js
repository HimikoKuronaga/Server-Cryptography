const express = require('express');
const { affVerify, GenerateKey } = require('./../../helpers/affine');
const app = express();

app.get('/affine/key', (req, res) => {
	let ring = req.query.ring || 128;
	ring = Number( ring );
	let key = GenerateKey(ring);

	res.json({
		ok: true,
		key 
	});
});

app.get('/affine/verify', (req, res)=>{
	let a = req.query.a;
	let b = req.query.b;
	let ring = req.query.ring || 128;
	ring = Number(ring);
	
	if(!a || !b)
		return res.status(400).json({
			ok: false,
			err:'Debes proporcionar la llave'
		});
	
	let resp = affVerify(a, b, ring)	
	
	if( resp === 3 )
		res.json({
			ok: true,
			resp
		});
	else
		res.json({
			ok: false,
			resp
		});
});

module.exports = app;
