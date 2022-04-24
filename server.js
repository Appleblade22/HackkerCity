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
const dbprob = "mongodb+srv://kali:kali@data.vcmov.mongodb.net/questions?retryWrites=true&w=majority";


const { eval } = require("./Compilation/eval.js");
app.use(express.static(path.join(__dirname, 'dashboard')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3000, 'localhost', () => {
    console.log("Server is running");
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
app.get('/Problem/index.html', (req, res) => {
    res.render("problem");
});
app.get('/Problemset/*', (req, res) => {
    let pro = req.url.split("/")[2];
    let lang = null;
    if (pro == "Cpp.html") {
        lang = "C++";
    }
    else if (pro == "Java.html") {
        lang = "JAVA";
    }
    else if (pro == "Python.html") {
        lang = "PYTHON";
    }
    else if (pro == "C.html") {
        lang = "C";
    }

    mongoose.connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            mongoose.connection.db.collection("problem-set").find({ LANGUAGE: lang }).toArray((err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.render("problemset", {
                        info: result,
                        lan: lang
                    })
                }
            });
        })
        .catch(() => {
            console.log("Connection failed");
        });
});
app.get('/Problem/*', (req, res) => {
    let pro = req.url.split("/")[2].replace(/%20/g, " ");
    console.log(pro);
    //Database query in mongodb
    mongoose.connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            mongoose.connection.db.collection("problem").find({ PROBLEM_NAME: pro }).toArray((err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("problem", {
                        info: result,
                    })
                }
            });
        })
        .catch(() => {
            console.log("Connection failed");
        });
});
app.get('/Profile/profile.html', (req, res) => {
    res.render("profile");
});
app.get('/Skills/skills.html', (req, res) => {
    console.log("Hello server");
    res.render("skills");
});