document.getElementByClassName("login-form").style.display = "none";
document.getElementByClassName("login").css("background", "none");

document.getElementByClassName("login").click(function(){
  document.getElementByClassName("signup-form").style.display = "none";
  document.getElementByClassName("login-form").style.display = "";
  document.getElementByClassName("signup").css("background", "none");
  document.getElementByClassName("login").css("background", "#fff");
});

document.getElementByClassName("signup").click(function(){
  document.getElementByClassName("signup-form").style.display = "";
  document.getElementByClassName("login-form").style.display = "none";
  document.getElementByClassName("login").css("background", "none");
  document.getElementByClassName("signup").css("background", "#fff");
});

document.getElementByClassName("btn").click(function(){
  document.getElementByClassName("input").value = "";
});