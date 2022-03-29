console.log(JSON.parse(localStorage.getItem("userData")));

function insertTest() {
  const insertCard = document.querySelector(".row");
  insertCard.innerHTML += `<div class="card">
      <div class="card-body">
        <p class="card-text">
          <h4>Test</h4>
        </p>
      </div>
    </div>`;
}
<<<<<<< HEAD

//Logout
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



// insertTest()
=======
>>>>>>> d5a1bd708d374e162e1bab17530d628786f180cd
