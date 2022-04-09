const { response } = require('express');
const express = require('express');
const { render } = require('express/lib/response')
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }));
let path = require('path');
const dbuser = "mongodb+srv://kali:kali@data.vcmov.mongodb.net/User?retryWrites=true&w=majority";

mongoose.connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, 'localhost', () => {
            console.log("Server is running")
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });

app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Dashboard/index.html")
})

