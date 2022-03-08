document.querySelector(".login-form").style.display="none";
document.querySelector(".login").style.background ="none";

console.log(document.querySelector(".login"));
document.querySelector(".login").addEventListener('click', () =>{
  document.querySelector(".signup-form").style.display = "none";
  document.querySelector(".login-form").style.display = "block";
  document.querySelector(".signup").style.background = "none";
  document.querySelector(".login").style.background ="#fff";
});

document.querySelector(".signup").addEventListener("click",() => {
  document.querySelector(".signup-form").style.display = "block";
  document.querySelector(".login-form").style.display = "none";
  document.querySelector(".login").style.background = "none";
  document.querySelector(".signup").style.background ="#fff";
});

document.querySelector(".btn1").addEventListener("click",() =>{
  console.log(document.querySelectorAll(".input"));
});

document.querySelector(".btn2").addEventListener("click",() =>{
  console.log(document.querySelectorAll(".input"));
});