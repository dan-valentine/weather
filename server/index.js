const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();

app.use(cors());
app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );
let recent = [];

app.get('/api/places', (req, res) => {
    res.send(recent)
})

app.post('/api/places', (req, res) => {
    const {selectedState, city} = req.body;
    recent.unshift({selectedState, city});
    recent = recent.slice(0,3);
    res.send(recent);
})

app.listen(3131, _ => {
    console.log(`yo I'm up on port 3131`)
})