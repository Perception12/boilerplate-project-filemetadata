var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer ({dest: 'uploads/'})
require('dotenv').config()
var bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

// var handlebars = require('express-handlebars').create({ defaultLayout: null });
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  var response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }

  res.json(response);
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
