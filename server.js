const { response } = require('express');
const express = require('express');
const { render } = require('express/lib/response')
const app = express();
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }));
let path = require('path');
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Dashboard/index.html")
})
app.listen(3010, 'localhost', () => {
    console.log("Server is running")
})
