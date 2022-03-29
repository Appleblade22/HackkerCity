
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
