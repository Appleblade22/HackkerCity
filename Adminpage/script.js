const user = document.querySelector(".user");
const block = document.querySelector(".block");
const unblock = document.querySelector(".unblock");
const hiddentable = document.querySelector(".submission-container");
const confirmbtn = document.querySelector(".confirmbtn");
const confirmbtn1 = document.querySelector(".confirmbtn1");
const modall = document.querySelector(".modall");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modall");

const openModal = function () {
  modall.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modall.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector(".error").setAttribute("style", "display:none");
  document.querySelector(".textfield").value = "";
};

const headingcls = document.querySelector(".headingcls");
const headingcls1 = document.querySelector(".headingcls1");

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

user.addEventListener("click", () => {
  hiddentable.classList.toggle("hidden");
});

block.addEventListener("click", () => {
  hiddentable.classList.add("hidden");
  modall.classList.remove("hidden");
  overlay.classList.remove("hidden");
  headingcls1.classList.add("hidden");
  headingcls.classList.remove("hidden");
  confirmbtn1.classList.add("hidden");
  confirmbtn.classList.remove("hidden");
});

unblock.addEventListener("click", () => {
  hiddentable.classList.add("hidden");
  modall.classList.remove("hidden");
  overlay.classList.remove("hidden");
  headingcls.classList.add("hidden");
  headingcls1.classList.remove("hidden");
  confirmbtn.classList.add("hidden");
  confirmbtn1.classList.remove("hidden");
});

const logout = document.getElementById("logout");
if (logout) {
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("userData");
    window.location.href = "../Dashboard/index.html";
  });
}
const log = document.getElementById("log");
if (log) {
  log.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("userData");
    window.location.href = "../Dashboard/index.html";
  });
}
