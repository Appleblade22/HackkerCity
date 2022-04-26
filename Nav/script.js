const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
menuBtn.onclick = () => {
  document.body.classList.toggle("lock-scroll");
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
};

cancelBtn.onclick = () => {
  document.body.classList.toggle("lock-scroll");
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  cancelBtn.style.color = "white";
};
searchBtn.onclick = () => {
  window.location.href =
    "/Profile/" +
    JSON.parse(localStorage.getItem("userData")).currentUser.email;
};

window.onscroll = function () {
  myFunction();
};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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
const submissionsbtn = document.getElementById("submissions-btn");
submissionsbtn.addEventListener("click", (event) => {
  window.location.href =
    "/Submission/" +
    JSON.parse(localStorage.getItem("userData")).currentUser.email;
});
const pfpbtn = document.getElementById("pfpbtn");
pfpbtn.addEventListener("click", (event) => {
  window.location.href =
    "/Profile/" +
    JSON.parse(localStorage.getItem("userData")).currentUser.email;
});
