const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config')
const bodyParser = require('body-parser');
const router = require('./router/router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(config.cors));

router(app);

app.listen(config.port, ()=>{
    console.log
})