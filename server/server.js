require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', "GET, POST");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use(require('./routes/index.js'));
app.listen(process.env.PORT,() => {
	console.log(`Escuchando conexiones en el puerto ${process.env.PORT}`);
});
