const { response } = require("express");
const express = require("express");
const { render } = require("express/lib/response");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());
let path = require("path");
const dbuser =
  "mongodb+srv://kali:kali@data.vcmov.mongodb.net/User?retryWrites=true&w=majority";
const dbprob =
  "mongodb+srv://kali:kali@data.vcmov.mongodb.net/questions?retryWrites=true&w=majority";

const { eval } = require("./Compilation/eval.js");
app.use(express.static(path.join(__dirname, "dashboard")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3000, "localhost", () => {
  console.log("Server is running");
});

app.post("/compile", (req, res) => {
  console.log(req.body);
  let pro = req.body.url.split("/")[4].replace(/%20/g, " ");
  let code = req.body.code;
  mongoose
    .connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      mongoose.connection.db
        .collection("problem")
        .find({ PROBLEM_NAME: pro })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              let data = result[0];
              fs.writeFileSync("./Compilation/input.txt", data.SAMPLE_INPUT);
              let output = eval(code, req.body.lang);
              console.log(data);
              console.log("cmp : ", output, data.SAMPLE_OUTPUT);
              if (output === data.SAMPLE_OUTPUT) {
                res.send({
                  status: true,
                  message: "Correct Answer",
                });
              } else {
                res.send({
                  status: false,
                  message: "Wrong Answer",
                });
              }
            }
            else {
              res.send({
                status: false,
                message: "SERVER ERROR",
                output: output,
              });
          }
          }
          mongoose.disconnect();
        });
    })
    .catch(() => {
      console.log("Connection failed");
      res.send({
        status: false,
        message: "Server error",
        output: output,
      });
    });
});
app.post("/getlang", (req, res) => {
  console.log(req.body);
  let pro = req.body.url.split("/")[4].replace(/%20/g, " ");
  mongoose
    .connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      mongoose.connection.db
        .collection("problem")
        .find({ PROBLEM_NAME: pro })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              let data = result[0];
              res.send({
                status: true,
                message: "Success",
                lang: data.LANGUAGE,
              });
            }
            else {
              res.send({
                status: false,
                message: "SERVER ERROR",
              });
          }
          }
          mongoose.disconnect();
        });
    })
    .catch(() => {
      console.log("Connection failed");
      res.send({
        status: false,
        message: "Server error",
      });
    });
});


app.post("/checkUser", (req, res) => {
  console.log("login req: " + req.body.email);
  mongoose
    .connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('good1')
      mongoose.connection.db
        .collection("users")
        .find({email: req.body.email})
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            if(result.length < 1){
              console.log('inserting')
              mongoose.connection.db.collection("users").insertOne(
                {
                  email: req.body.email,
                  submissions: [],
                }
              )
            }
            mongoose.disconnect();
          }
        });
    })
    .catch(() => {
      console.log("Connection failed");
      res.render('problem');
    });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Dashboard/index.html");
});
app.get("/Problem/index.html", (req, res) => {
  res.render("problem");
});
app.get("/Problemset/*", (req, res) => {
  let pro = req.url.split("/")[2];
  let lang = null;
  if (pro == "Cpp.html") {
    lang = "C++";
  } else if (pro == "Java.html") {
    lang = "JAVA";
  } else if (pro == "Python.html") {
    lang = "PYTHON";
  } else if (pro == "C.html") {
    lang = "C";
  }
  console.log('fine')
  mongoose
    .connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      mongoose.connection.db
        .collection("problem-set")
        .find({ LANGUAGE: lang })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.render("problemset", {
              info: result,
              lan: lang,
            });
          }
          mongoose.disconnect();
        });
    })
    .catch((err) => {
      console.log("Connection failed");
      console.log(err)
    });
});
app.get("/Problem/*", (req, res) => {
  let pro = req.url.split("/")[2].replace(/%20/g, " ");
  console.log(pro);
  //Database query in mongodb
  mongoose
    .connect(dbprob, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      mongoose.connection.db
        .collection("problem")
        .find({ PROBLEM_NAME: pro })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.render("problem", {
              info: result,
            });
          }
          mongoose.disconnect();
        });
    })
    .catch(() => {
      console.log("Connection failed");
    });
});
app.get("/Profile/:email", (req, res) => {
  console.log(req.params);
  mongoose
    .connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('good2')
      mongoose.connection.db
        .collection("users")
        .find({email: req.params.email})
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            if(result.length < 1){
              res.render("profile", {
                info: [{"submissions": []}],
              })
            }
            else {
              res.render("profile", {
                info: result,
              });
            }
            mongoose.disconnect();
          }
        });
    })
    .catch(() => {
      console.log("Connection failed");
      res.render('profile');
    });
});
app.get("/Submission/:email", (req, res) => {
  console.log(req.params);
  mongoose
    .connect(dbuser, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('good3')
      mongoose.connection.db
        .collection("users")
        .find({email: req.params.email})
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result.length);
            if(result.length < 1){
              res.render("submission", {
                info: [{"submissions": []}],
              })
            }
            else {
              res.render("submission", {
                info: result,
              });
            }
            mongoose.disconnect();
          }
        });
    })
    .catch((err) => {
      console.log("Connection failed");
      console.log(err);
      res.render('submission');
    });
});
app.get("/Skills/skills.html", (req, res) => {
  res.render("skills");
});


// db.stores.find( { $text: { $search: "java coffee shop" } } )
