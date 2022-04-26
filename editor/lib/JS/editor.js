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
    fetch("/getlang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: window.location.href,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("lang: " + data.lang);
        if (data.status) {
          if (data.lang === "C++") {
            codeEditor.session.setMode("ace/mode/c_cpp");
          } else if (data.lang === "JS") {
            codeEditor.session.setMode("ace/mode/javascript");
            language = "JS";
          } else if (data.lang === "PYTHON") {
            codeEditor.session.setMode("ace/mode/python");
            language = "PYTHON";
          } else if (data.lang === "C") {
            codeEditor.session.setMode("ace/mode/c_cpp");
            language = "C";
          }
        }
      });
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
const editMessage = document.querySelector(".message");
const editExpectOut = document.querySelector(".expectedout");
const editYourOut = document.querySelector(".yourout");
const bottom = document.querySelector(".bottom");
const label = document.querySelector(".expect");
executeCodebtn.addEventListener("click", function () {
  bottom.classList.remove("hidden");
  let code = codeEditor.getValue();
  try {
    fetch("http://localhost:3000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        lang: language,
        url: window.location.href,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          editConsole.innerHTML =
            `<i class="bi bi-check-circle"></i>` + "ALL TEST CASES PASSED!";
        } else if (data.output.includes("error", 0)) {
          editMessage.innerHTML = "Compilation Error  :(";
          editExpectOut.classList.add("hidden");
          label.classList.add("hidden");
          editYourOut.innerHTML = data.output;
        } else {
          editMessage.innerHTML = "WRONG ANSWER   :(";
          editExpectOut.innerHTML = data.correctOutput.replace(/\n/g, "<br>");
          editYourOut.innerHTML = data.output.replace(/\n/g, "<br>");
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
