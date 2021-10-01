const express = require('express');
const http = require('http');
const cors = require('cors');
const config = require('./config');
const routes = require('./v1/routes');
var bodyParser = require('body-parser')

const {SERVERPORT} = config;


const app = express();

const server = http.createServer(app);

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.send("certo")
});

app.use("/v1", routes);

server.listen(SERVERPORT, ()=>{
    console.log(`Server initialized port ${SERVERPORT}`)
});