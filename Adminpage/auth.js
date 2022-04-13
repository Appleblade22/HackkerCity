// Importing all modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
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
        login
      );
    });
  });
}
RetrieveData();

let stdNo = 0;
function AddItemsToTable(uid, email, username, lastlogin) {
  let tbody = document.getElementById("tbody1");
  let trow = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");

  td1.innerHTML = ++stdNo;
  td2.innerHTML = uid;
  td3.innerHTML = email;
  td4.innerHTML = username;
  td5.innerHTML = lastlogin;
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  tbody.appendChild(trow);
}

