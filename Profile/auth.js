import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';
import { getDatabase, onValue, ref, update } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyAvdACqDU3yNw2kHI1nFkfhzp5l8CXdp8U",
    authDomain: "hackercity-dc10f.firebaseapp.com",
    databaseURL: "https://hackercity-dc10f-default-rtdb.firebaseio.com",
    projectId: "hackercity-dc10f",
    storageBucket: "hackercity-dc10f.appspot.com",
    messagingSenderId: "708724640074",
    appId: "1:708724640074:web:9bf5a99aa8caa3991cd9b3",
    measurementId: "G-6TMD2EJLF3"
};

// Initialize Firebase
const udata = JSON.parse(localStorage.getItem("userData"));
const uid = udata.currentUser.uid;
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const data = ref(db, 'users/' + uid + '/username');
onValue(data, snap => {
    const username = snap.val();
    console.log(username);
    document.getElementById("userName").setAttribute("value", username);
    document.getElementById("uheading").innerHTML = "@" + username;
});
//Setting Email
document.getElementById("Email").setAttribute("value", udata.currentUser.email);
//Setting Username from database

