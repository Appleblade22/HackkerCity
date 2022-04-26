//Retrieve Elements
const executeCodebtn = document.querySelector(".editor__submit");
const resetCodebtn = document.querySelector(".editor__reset");
const defaultCode = "// Hello my friends" + "\n";

//Setup ace
let codeEditor = ace.edit("editorCode");
// function setsesh(){
//   fetch('/getlang', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         url: window.location.href,
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if(data.status){
//         if(data.lang === "C++"){
//           codeEditor.session.setMode("ace/mode/c_cpp");
//         } else if(data.lang === "Java"){
//           codeEditor.session.setMode("ace/mode/java");
//         }
//         else if(data.lang === "Python"){
//           codeEditor.session.setMode("ace/mode/python");
//         }
//         else if(data.lang === "C"){
//           codeEditor.session.setMode("ace/mode/c_cpp");
//         }
//       }
//     }
//   )

// }
let consoleMessages = [];
let language = "C++";
let editorlib = {
  init() {
    codeEditor.setTheme("ace/theme/dracula");
    fetch('/getlang', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
          url: window.location.href,
          })
      })
      .then(res => res.json())
      .then(data => {
        console.log("lang: " + data.lang)
        if(data.status){
          if(data.lang === "C++"){
            codeEditor.session.setMode("ace/mode/c_cpp");
          } else if(data.lang === "JS"){
            codeEditor.session.setMode("ace/mode/javascript");
            language="JS";
          }
          else if(data.lang === "PYTHON"){
            codeEditor.session.setMode("ace/mode/python");
            language="PYTHON";
          }
          else if(data.lang === "C"){
            codeEditor.session.setMode("ace/mode/c_cpp");
            language="C";
          }
        }
      })
    codeEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: "16px",
      showPrintMargin: false,
      showGutter: true,
      highlightActiveLine: true,
      showLineNumbers: true,
      tabSize: 2,
      useSoftTabs: true,
    });
    codeEditor.setValue(defaultCode);
  },
};
//Events
const editConsole = document.querySelector(".editor__console-logs")
executeCodebtn.addEventListener("click", function () {
  let code = codeEditor.getValue();
  try {
    fetch("http://localhost:3000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "code": code, "lang": language, "url": window.location.href, "email": JSON.parse(localStorage.getItem("userData")).currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          editConsole.innerHTML =  `<i class="bi bi-check-circle"></i>` + "ALL TEST CASES PASSED!";
        }
        else {
          editConsole.innerHTML = "WRONG ANSWER <br> Expected Output: " + data.correctOutput + "<br> Your Output: " + data.output;
        }
      });
  } catch (err) {
    console.log(err);
  }
});

resetCodebtn.addEventListener("click", function () {
  codeEditor.setValue(defaultCode);
});

editorlib.init();
