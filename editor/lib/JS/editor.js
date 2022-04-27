//Retrieve Elements
const executeCodebtn = document.querySelector(".editor__submit");
const resetCodebtn = document.querySelector(".editor__reset");
//make a default code for C, c++, java, python
let dcode = "";
const defaultCode = {

  'C++': `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,

  "C": `#include <stdio.h>
int main() {
    printf("Hello World!");
    return 0;
}`,
  "python": `print("Hello World!")`,
  "javascript": `console.log("Hello World!")`
};



//Setup ace
let codeEditor = ace.edit("editorCode");
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
        language = data.lang;
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
        // codeEditor.setValue(defaultCode[language.toLowerCase]);

        if (language.toLowerCase() === "c++") {
          dcode = defaultCode["C++"];
        } else if (language.toLowerCase() === "c") {
          dcode = defaultCode["C"];
        } else if (language.toLowerCase() === "python") {
          dcode = defaultCode["python"];
        } else if (language.toLowerCase() === "javascript") {
          dcode = defaultCode["javascript"];
        }
        codeEditor.setValue(dcode);
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
        email: JSON.parse(localStorage.getItem("userData")).currentUser.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status) {
          editMessage.innerHTML =
            `<i class="bi bi-check-circle"></i>` + "ALL TEST CASES PASSED!";
          editExpectOut.classList.remove("hidden");
          label.classList.remove("hidden");
          editExpectOut.innerHTML = data.correctOutput.replace(/\n/g, "<br>");
          editYourOut.innerHTML = data.output.replace(/\n/g, "<br>");
        } else if (
          data.output.includes("error", 0) ||
          data.output.includes("Error", 0)
        ) {
          editMessage.innerHTML = "Compilation Error  :(";
          editExpectOut.classList.add("hidden");
          label.classList.add("hidden");
          editYourOut.innerHTML = data.output;
        } else {
          editMessage.innerHTML = "WRONG ANSWER   :(";
          editExpectOut.classList.remove("hidden");
          label.classList.remove("hidden");
          editExpectOut.innerHTML = data.correctOutput.replace(/\n/g, "<br>");
          editYourOut.innerHTML = data.output.replace(/\n/g, "<br>");
        }
      });
  } catch (err) {
    console.log(err);
  }
});

resetCodebtn.addEventListener("click", function () {
  codeEditor.setValue(dcode);
});

editorlib.init();
