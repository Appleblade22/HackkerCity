const fs = require("fs");
const { exec, execSync } = require("child_process");
const { stderr } = require("process");

const eval = (code, lang) => {
  if(lang === "cpp"){
    fs.writeFileSync("./Compilation/eval.cpp", code);
    let childp1
    try{
      childp1 = execSync("g++ ./Compilation/eval.cpp -o eval")
    }catch(err){
      return err.stderr.toString();
    }

    try {
        let childp2 = execSync(".\\eval.exe");
        return childp2.toString() ;
    }
    catch(err) {
        return err.stderr.toString();
    }
  }
  if(lang === "python"){
    fs.writeFileSync("./Compilation/evall.py", code);
    try {
        let childp2 = execSync("py ./Compilation/evall.py");
        return childp2.toString() ;
    }
    catch(err) {
        return err.stderr.toString();
    }
  }
  if(lang === "c"){
    fs.writeFileSync("./Compilation/evalC.c", code);
    let childp1;
    try {
        childp1 = execSync("gcc ./Compilation/evalC.c");
    }
    catch(err) {
        return err.stderr.toString();
    }
      try {
        let childp2 = execSync(".\\a.exe");
        return childp2.toString() ;
    }
      catch(err) {
          return err.stderr.toString();
      }
    }

  if(lang === "javascript"){
    fs.writeFileSync("./Compilation/evalJs.js", code);
    let childp1;
    try {
        childp1 = execSync("node ./Compilation/evaljs.js");
        return childp1.toString() ;
    }
    catch(err) {
        return err.stderr.toString();
    }
  }
};

module.exports = { eval };
