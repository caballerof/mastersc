const expressLib = require("express");

const port = 3001;
var app = expressLib();
var path = require("path");
const plantilla = require("ejs");
/*************************************************** */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/*************************************************** */
app.use(expressLib.static('public'))
app.use(expressLib.static('Views'))
app.set("view engine", "ejs");


app.get('*', (req, response) => {
	response.render("page", { data: req.url });
	//response.render("contacto")
});

/****************** */
var fs = require('fs');
//var writer = fs.createWriteStream('output.txt');

//app.use('/public', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));


app.post('/contact', function (request, respond) {
	let fileName = "comentarios/coment" + Date.now().json;


	fs.writeFile(fileName, generaData(request), 'utf-8', function (err) {
		if (err) throw err
		console.log('Done!');
	})

});
/****************** */

function generaData(request) {
	let data = { "name": "", "email": "" };
	data.name = request.body.name;
	data.email = request.body.email;
	return JSON.parse(data);
}

console.log(`puerto ${port}`);
app.listen(port);

