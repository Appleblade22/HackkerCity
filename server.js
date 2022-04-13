const { response } = require("express");
const express = require("express");
const { render } = require("express/lib/response");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json())
let path = require('path');
const dbuser = "mongodb+srv://kali:kali@data.vcmov.mongodb.net/User?retryWrites=true&w=majority";
const { eval } = require("./Compilation/eval.js");
app.use(express.static(path.join(__dirname, 'dashboard')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


mongoose.connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, 'localhost', () => {
            console.log("Server is running")
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });

app.post("/compile", (req, res) => {
    console.log(req.body);
    let code = req.body.code;
    let output = eval(code, req.body.lang);
    console.log(output);
    res.send({
        status: true,
        message: "Code Compiled Successfully",
        output: output,
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Dashboard/index.html");
});
app.get('/edit', (req, res) => {
    res.render("editor");
});