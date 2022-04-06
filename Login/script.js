import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

//Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvdACqDU3yNw2kHI1nFkfhzp5l8CXdp8U",
  authDomain: "hackercity-dc10f.firebaseapp.com",
  databaseURL: "https://hackercity-dc10f-default-rtdb.firebaseio.com",
  projectId: "hackercity-dc10f",
  storageBucket: "hackercity-dc10f.appspot.com",
  messagingSenderId: "708724640074",
  appId: "1:708724640074:web:9bf5a99aa8caa3991cd9b3",
  measurementId: "G-6TMD2EJLF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

// Form Message functions
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
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form_input-error");
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = "";
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

//Login Backend
const loginForm = document.getElementById("enter");
if (loginForm) {
  let flag2 = 1;
  loginForm.addEventListener("click", (event) => {
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
      const spin = document.getElementById("cover-spin");
      signInWithEmailAndPassword(auth, email, password)
        .then(function (userCredentials) {
          spin.style.display = "block";
          const us = userCredentials.user;
          const date = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          });
          update(ref(database, "users/" + us.uid), {
            last_login: date,
          })
            .then(function () {
              // console.log(auth);
              // console.log(auth.currentUser);
              localStorage.setItem("userData", JSON.stringify(auth));
              const isadmin = auth.currentUser.uid;
              console.log(auth.currentUser.uid);
              const data = ref(database, "/users");
              onValue(data, (snapshot) => {
                snapshot.forEach((child) => {
                  console.log(child.val().uid);
                  if (child.val().uid == isadmin) {
                    console.log(child.val().admin);
                    if (child.val().admin == true) {
                      window.location.href = "../Adminpage/index.html";
                    } else {
                      window.location.href = "../Skills/skills.html";
                    }
                  }
                });
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          spin.style.display = "none";
          if (error.message.includes("user-not-found")) {
            setFormMessage(form, "error", "User Not Found");
          } else if (error.message.includes("wrong-password")) {
            setFormMessage(form, "error", "Wrong Password");
          } else {
            setFormMessage(form, "error", "Something went wrong");
          }
        });
    }
  });
}

//Signup Backend
const signupForm = document.getElementById("save_data");
if (signupForm) {
  signupForm.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("Signup");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const username = document.getElementById("signupUsername").value;
    console.log(typeof username);
    clearFormMessage(form);
    let flags = 1;
    if (
      email === "" ||
      password === "" ||
      cpassword === "" ||
      username === ""
    ) {
      setFormMessage(form, "error", "Please fill all the fields");
      flags = 0;
    }
    if (!ValidateEmail(email)) {
      setFormMessage(form, "error", "Please enter a valid email");
      flags = 0;
    }
    if (password.length < 6) {
      setFormMessage(
        form,
        "error",
        "Password must be atleast 6 characters long"
      );
    }
    if (password !== cpassword) {
      setFormMessage(form, "error", "Passwords do not match");
      flags = 0;
    }
    //Create operation with firebase
    if (flags && username.length > 3 && ValidateEmail(email)) {
      // console.log(flags);
      const spin = document.getElementById("cover-spin");
      createUserWithEmailAndPassword(auth, email, password)
        .then(function (userCredentials) {
          spin.style.display = "block";
          const us = userCredentials.user;
          set(ref(database, "users/" + us.uid), {
            username: username,
            email: email,
            uid: userCredentials.user.uid,
            admin: false,
            block: false,
          })
            .then(function () {
              window.location.href = "../Login/Redirect.html";
              console.log(userCredentials.user.uid);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          spin.style.display = "none";
          console.log(error);
          if (error.message.includes("email-already-in-use")) {
            setFormMessage(form, "error", "Email already in use");
          } else {
            setFormMessage(form, "error", "Something went wrong");
          }
        });
    }
  });
}

//Email and Username validation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".form_input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 4
      ) {
        setInputError(
          inputElement,
          "Username must be at least 4 characters in length"
        );
      }
    });

    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "email" &&
        e.target.value.length > 0 &&
        !e.target.value.includes("@")
      ) {
        setInputError(inputElement, "Please enter a valid email address");
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});

//Forgot password
const forgotForm = document.getElementById("send_reset");
if (forgotForm) {
  console.log("Heya");
  forgotForm.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("forgot");
    const email = document.getElementById("email").value;
    clearFormMessage(form);
    let flag1 = 1;
    if (email === "") {
      setFormMessage(form, "error", "Please enter your email");
      flag1 = 0;
    }
    if (!ValidateEmail(email)) {
      setFormMessage(form, "error", "Please enter a valid email");
      flag1 = 0;
    }
    if (flag1 && ValidateEmail(email)) {
      sendPasswordResetEmail(auth, email)
        .then(function () {
          setFormMessage(form, "success", "Password reset email sent");
          window.location.href = "../Login/login.html";
        })
        .catch(function (error) {
          setFormMessage(form, "error", "Something went wrong");
        });
    }
  });
}
