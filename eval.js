const fs = require("fs");
const { exec, execSync } = require("child_process");
const { stderr } = require("process");

const eval = (code) => {
  fs.writeFileSync("eval.cpp", code);
  let childp1
  try{
    childp1 = execSync("g++ eval.cpp -o eval")
  }catch(err){
    return err.stderr.toString();
  }
  //    (err, stdout, stderr) => {
    // if (err) {
    //   console.log(err);
    //   return err;
    // }
//   });
try {
    let childp2 = execSync(".\\eval.exe");
    return childp2.toString() ;
}
catch(err) {
    return err.stderr.toString();
}
//    (err, stdout, stderr) => {
//     if (err) {
//       console.log(err);
//       return err;
//     }
//     console.log(stdout, stderr);
//     return { stdout, stderr };
//   });
};

module.exports = { eval };
