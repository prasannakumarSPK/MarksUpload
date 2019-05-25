const express = require('express');
const server = express();
const upload = require('./upload');/* configuring route for upload file */
const grades = require('./grades')

const cors = require('cors');/*to access Angular Api's*/

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

server.use(cors(corsOptions));/*Now we tell express to use cors-middleware(like a Bridge)*/

server.post('/upload',upload);/* go to upload.js and function upload is called*/
server.get('/grades/:id', grades)
server.listen(8000, () => {
    console.log('Server started!');
});