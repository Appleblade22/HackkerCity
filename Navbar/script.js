const menubar = document.querySelectorAll(".list");

function display() {
  for (let i = 0; i < menubar.length; i++) {
    menubar[i].style.display = "block";
  }
}

document.querySelector(".menu").addEventListener("click", display);
