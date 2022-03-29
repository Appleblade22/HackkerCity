//Retrieve Elements
const resetCodebtn = document.querySelector(".editor__reset")
const defaultCode  = "console.log('Hello World!');" + "\n";

//Setup ace
let codeEditor = ace.edit("editorCode");
codeEditor.setReadOnly(true);
let consoleMessages = [];
let editorlib = {
    init(){
        codeEditor.setTheme("ace/theme/dracula");
        codeEditor.session.setMode("ace/mode/javascript");
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
            setReadOnly: true
        });
        codeEditor.setValue(defaultCode);
    }
}

editorlib.init();

