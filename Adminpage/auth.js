// Importing all modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

//------------------------------------------

//Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvdACqDU3yNw2kHI1nFkfhzp5l8CXdp8U",
  authDomain: "hackercity-dc10f.firebaseapp.com",
  databaseURL: "https://hackercity-dc10f-default-rtdb.firebaseio.com",
  projectId: "hackercity-dc10f",
  storageBucket: "hackercity-dc10f.appspot.com",
  messagingSenderId: "708724640074",
  appId: "1:708724640074:web:9bf5a99aa8caa3991cd9b3",
  measurementId: "G-6TMD2EJLF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
//Retrieve data from firebase
function RetrieveData() {
  const data = ref(db, "/users");
  onValue(data, (snapshot) => {
    snapshot.forEach((child) => {
      let login = child.val().last_login;
      console.log(login);
      if (login == undefined) {
        login = "Never Logged In";
      }
      AddItemsToTable(
        child.val().uid,
        child.val().email,
        child.val().username,
        login,
        child.val().block
      );
    });
  });
}
RetrieveData();

let stdNo = 0;
function AddItemsToTable(uid, email, username, lastlogin, block) {
  let tbody = document.getElementById("tbody1");
  let trow = document.createElement("tr");
  trow.setAttribute("scope", "row");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  if (block == true) {
    trow.setAttribute("class", "table-danger");
  }
  td1.innerHTML = ++stdNo;
  td2.innerHTML = uid;
  td3.innerHTML = email;
  td4.innerHTML = username;
  td5.innerHTML = lastlogin;
  td6.innerHTML = block;
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  tbody.appendChild(trow);
}

function updateUserData(blocked) {
  let label = document.querySelector(".textfield");
  let uid = label.value;
  //Get data 

  let dbref = ref(db);
  get(child(dbref, "users/" + uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let email = snapshot.val().email;
        let username = snapshot.val().username;
        let lastlogin = snapshot.val().last_login;
        let admin = snapshot.val().admin;

        //Update data
        if (lastlogin) {
          update(ref(db, "users/" + uid), {
            admin: admin,
            block: blocked,
            email: email,
            uid: uid,
            username: username,
            last_login: lastlogin,
          });
          label.value = "";
          location.reload();
        }
        else {
          update(ref(db, "users/" + uid), {
            admin: admin,
            block: blocked,
            email: email,
            uid: uid,
            username: username
          });
          label.value = "";
          location.reload();
        }


      }
      else {
        document.querySelector(".error").setAttribute("style", "display:block");
      }
    })
    .catch((error) => {
      console.log(error);
    }
    );

}

document.querySelector(".confirmbtn").addEventListener("click", function () {
  updateUserData(true);
});
document.querySelector(".confirmbtn1").addEventListener("click", function () {
  updateUserData(false);
});
