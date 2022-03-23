import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvdACqDU3yNw2kHI1nFkfhzp5l8CXdp8U",
    authDomain: "hackercity-dc10f.firebaseapp.com",
    databaseURL: "https://hackercity-dc10f-default-rtdb.firebaseio.com",
    projectId: "hackercity-dc10f",
    storageBucket: "hackercity-dc10f.appspot.com",
    messagingSenderId: "708724640074",
    appId: "1:708724640074:web:9bf5a99aa8caa3991cd9b3",
    measurementId: "G-6TMD2EJLF3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();
console.log(auth);

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent = message;
    messageElement.classList.remove("form_message-success", "form_message-error");
    messageElement.classList.add(`form_message-${type}`);
}
function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form_message");
    messageElement.textContent = "";
    messageElement.classList.remove("form_message-success", "form_message-error");
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
const loginForm = document.getElementById("enter");
let flag2 = 1;
loginForm.addEventListener('click', (event) => {
    flag2 = 1;
    const form = document.getElementById("login");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    clearFormMessage(form);
    if (email === "" || password === "") {
        setFormMessage(form, "error", "Please fill all the fields");
        let flag2 = 0;
    }
    if (!ValidateEmail(email)) {
        setFormMessage(form, "error", "Please enter a valid email");
        let flag2 = 0;
    }
    if (flag2 && ValidateEmail(email)) {
        signInWithEmailAndPassword(auth, email, password).then(function (userCredentials) {
            const us = userCredentials.user;
            const date = new Date();
            update(ref(database, 'users/' + us.uid), {
                last_login: date,
            }).then(function () {
                console.log("User Logged in");
                window.location.href = "../Login/forgotpasssword.html";
            }).catch(function (error) {
                console.log(error);
            }
            );
        }).catch(function (error) {
            if (error.message.includes("user-not-found")) {
                setFormMessage(form, "error", "Email already in use");
            }
            else if (error.message.includes("wrong-password")) {
                setFormMessage(form, "error", "Wrong Password");
            }
            else if (error.message.includes("user-not-found")) {
                setFormMessage(form, "error", "User not found");
            }
            else {
                setFormMessage(form, "error", "Something went wrong");
            }
        });
    }
});

const signupForm = document.getElementById('save_data');
signupForm.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById("Signup");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const username = document.getElementById("signupUsername").value;
    console.log(typeof (username));
    clearFormMessage(form);
    let flags = 1;
    if (email === "" || password === "" || cpassword === "" || username === "") {
        setFormMessage(form, "error", "Please fill all the fields");
        flags = 0;
    }
    if (!ValidateEmail(email)) {
        setFormMessage(form, "error", "Please enter a valid email");
        flags = 0;
    }
    if (password.length < 6) {
        setFormMessage(form, "error", "Password must be atleast 6 characters long");
    }
    if (password !== cpassword) {
        setFormMessage(form, "error", "Passwords do not match");
        flags = 0;
    }
    //Do your Fetch operation with firebase
    if (flags && (username.length > 4) && ValidateEmail(email)) {
        createUserWithEmailAndPassword(auth, email, password).then(function (userCredentials) {
            const us = userCredentials.user;
            set(ref(database, 'users/' + us.uid), {
                username: username,
                email: email,
                password: password,
                uid: userCredentials.user.uid
            }).then(function () {
                alert('user created');
                console.log("User Created");
                window.location.href = "../Login/Login.html";
            }).catch(function (error) {
                console.log(error);
            });

        }).catch(function (error) {
            if (error.message.includes("email-already-in-use")) {
                setFormMessage(form, "error", "Email already in use");
            }
            else {
                setFormMessage(form, "error", "Something went wrong");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".form_input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 4 characters in length");
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