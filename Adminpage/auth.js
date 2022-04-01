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
      AddItemsToTable(child.val().uid, child.val().email, child.val().username, login);
    });
  });
}
RetrieveData();

var stdNo = 0;
function AddItemsToTable(uid, email, username, lastlogin) {
  var tbody = document.getElementById("tbody1");
  var trow = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");

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

// document.getElementById("confirm").addEventListener("click", (e) => {
//   e.preventDefault();
// console.log("sucess");
// //   const uid = document.getElementById("uid").value;
// //   const data = ref(db, "/users");
// //   onValue(data, (snapshot) => {
// //     snapshot.forEach((child) => {
// //       if (child.val().uid == uid) {
// //         getAuth()
// //           .deleteUser(uid)
// //           .then(() => {
// //             console.log('Successfully deleted user');
// //           })
// //           .catch((error) => {
// //             console.log('Error deleting user:', error);
// //           });
// //         return
// //       }
// //     });
// //   });
// // });
