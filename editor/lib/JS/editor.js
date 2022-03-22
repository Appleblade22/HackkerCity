//Retrieve Elements
const executeCodebtn = document.querySelector(".editor__run")
const resetCodebtn = document.querySelector(".editor__reset")
const defaultCode  = "// Hello my friends" + "\n";

//Setup ace
let codeEditor = ace.edit("editorCode");
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
            useSoftTabs: true
        });
        codeEditor.setValue(defaultCode);
    }
}
//Events
executeCodebtn.addEventListener("click", function(){
    let code = codeEditor.getValue();
    try{
    // console.log(eval(code));
    // console.log(new Function(code)());
    eval(code);
    }
    catch(err){
        console.error(err);
    }
});

resetCodebtn.addEventListener("click", function(){
    codeEditor.setValue(defaultCode );
});

editorlib.init();

