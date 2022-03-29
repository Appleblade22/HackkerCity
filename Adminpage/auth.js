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
      child.val().email;
      child.val().username;

      // this.intVal.push(child.val());
      // console.log("intVal", this.intVal);
    });

  });
}
RetrieveData();

// function SelectAllData() {
//   firebase
//     .database()
//     .ref("users")
//     .on("value", function (AllRecords) {
//       AllRecords.forEach(function (CurrentRecord) {
//         var username = CurrentRecord.val().username;
//         var email = CurrentRecord.val().email;
//         var lastlogin = CurrentRecord.val().last_login;
//         AddItemsToTable(email, username, lastlogin);
//         console.log(CurrentRecord);
//       });
//     });
// }

// document.addEventListene;

// var stdNo = 0;
// function AddItemsToTable(email, username, lastlogin) {
//   var tbody = document.getElementById("tbody1");
//   var trow = document.createElement("tr");
//   var td1 = document.createElement("td");
//   var td2 = document.createElement("td");
//   var td3 = document.createElement("td");
//   var td4 = document.createElement("td");
//   td1.innerHTML = ++stdNo;
//   td2.innerHTML = email;
//   td3.innerHTML = username;
//   td4.innerHTML = lastlogin;
//   trow.appendChild(td1);
//   trow.appendChild(td2);
//   trow.appendChild(td3);
//   trow.appendChild(td4);
//   tbody.appendChild(trow);
// }

// SelectAllData();
