const user = document.querySelector(".user");
const block = document.querySelector(".block");
const deleteuser = document.querySelector(".delete");
const hiddentable = document.querySelector(".submission-container");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const headingcls = document.querySelector(".headingcls");

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

user.addEventListener("click", () => {
  hiddentable.classList.toggle("hidden");
});

block.addEventListener("click", () => {
  hiddentable.classList.add("hidden");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  headingcls.textContent =
    "The User Account will be temporarily blocked and cannot be able to access the website";
});

deleteuser.addEventListener("click", () => {
  hiddentable.classList.add("hidden");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  headingcls.textContent =
    "The User Account will be permanently deleted. Please click confirm to continue";
});

// User List In Table
