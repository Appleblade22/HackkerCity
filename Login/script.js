function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent = message;
    messageElement.classList.remove("form_message-success", "form_message-error");
    messageElement.classList.add(`form_message-${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form_input-error");
    inputElement.parentElement.querySelector(".form_input-error-message").textContent = "";
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
function login(){
    const form = document.getElementById("login");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email === "" || password === ""){
        setFormMessage(form, "error", "Please fill all the fields");
        return;
    }
    if(!ValidateEmail(email)){
        setFormMessage(form, "error", "Please enter a valid email");
        return;
    }
    //Do your Fetch operation with firebase
    window.location.href = "http://www.w3schools.com";
}

function signup(){
    const form = document.getElementById("Signup");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const username = document.getElementById("signupUsername").value;
    if(email === "" || password === "" || cpassword === "" || username === ""){
        setFormMessage(form, "error", "Please fill all the fields");
        return;
    }
    if(!ValidateEmail(email)){
        setFormMessage(form, "error", "Please enter a valid email");
        return;
    }
    if(password !== cpassword){
        setFormMessage(form, "error", "Passwords do not match");
        return;
    }
    //Do your Fetch operation with firebase
    window.location.href = "http://www.w3schools.com";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".form_input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 7) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "email" && e.target.value.length > 0 && !e.target.value.includes("@")) {
                setInputError(inputElement, "Please enter a valid email address");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});