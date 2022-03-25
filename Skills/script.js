
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Hello")
console.log(JSON.parse(localStorage.getItem('userData')));
const token = JSON.parse(localStorage.getItem('userData')).currentUser.ascessToken;

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

const auth = getAuth();
console.log(auth.currentUser);
//Logout
const logout = document.getElementById('logout');
if (logout) {
  logout.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('userData');
    window.location.href = "../Login/login.html";
  });
}


// insertTest()
