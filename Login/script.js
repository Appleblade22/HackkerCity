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
document.addEventListener("DOMContentLoaded", () => {
    // const loginForm = document.querySelector("#login");
    // const signupForm = document.querySelector("#Signup");
    // loginForm.addEventListener("submit", e => {
    //     e.preventDefault();
    //     if(ValidateEmail(document.getElementById("email").value)){
    //     setFormMessage(loginForm, "success", "Email is valid!");
    //     }
    //     else{
    //         setFormMessage(loginForm, "error", "Invalid username/password combination");
    //     }
    //     // Perform your AJAX/Fetch login

    // });

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