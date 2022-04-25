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
        
        if(data.status){
          if(data.lang === "C++"){
            codeEditor.session.setMode("ace/mode/c_cpp");
          } else if(data.lang === "JAVA"){
            codeEditor.session.setMode("ace/mode/java");
            language="JAVA";
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
executeCodebtn.addEventListener("click", function () {
  let code = codeEditor.getValue();
  try {
    fetch("http://localhost:3000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "code": code, "lang": language, "url": window.location.href }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          alert(data.message);
        }
        else {
          alert(data.message);
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
