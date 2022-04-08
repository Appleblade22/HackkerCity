const { response } = require("express");
const express = require("express");
const { render } = require("express/lib/response");
const app = express();
const bodyparser = require("body-parser");
app.use(express.json());
app.use(express.static(__dirname));
let path = require('path');
const dburi = "mongodb + srv://kali:kali@data.vcmov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const { eval } = require("./eval.js");

app.post("/compile", (req, res) => {
  let code = req.body.code;
  let output = eval(code);
//   console.log(output);
  res.send({
    status: true,
    message: "Code Compiled Successfully",
    output: output,
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Dashboard/index.html");
});
app.listen(3000, "localhost", () => {
  console.log("Server is running");
});
