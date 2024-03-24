const express = require('express');
const http = require('http')

const app = express();
const server = http.Server(app);
const port = process.env.NODE_PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.render('room')
})





server.listen(port, () => console.log('Listening to port ' + port));

