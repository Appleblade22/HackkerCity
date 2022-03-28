const tablecontent = document.querySelector(".user");
const hiddentable = document.querySelector(".submission-container");

tablecontent.addEventListener("click", () => {
  hiddentable.classList.toggle("hidden");
});
