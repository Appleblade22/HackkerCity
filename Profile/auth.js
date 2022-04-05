import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';
import { getDatabase, onValue, ref, update, set } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js';
import { signInWithEmailAndPassword,getAuth, updatePassword, deleteUser } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
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
const auth = getAuth();

onValue(data, snap => {
    const username = snap.val();
    console.log(username);
    document.getElementById("userName").setAttribute("value", username);
    document.getElementById("uheading").innerHTML = "@" + username;
    document.getElementById("pfp-text").innerHTML = username[0] + username[1];
    document.querySelector("title").innerHTML = username + " - Profile";
});
//Setting Email
document.getElementById("Email").setAttribute("value", udata.currentUser.email);
//Setting Username from database
document.getElementById("edit-username-btn").addEventListener("click", () => {
    let username = document.getElementById("new-username").value;
    console.log(username.length)
    if(username.length < 3){
        alert("Username must be at least 3 characters long");
        return
    }
    signInWithEmailAndPassword(auth, udata.currentUser.email, document.getElementById("edit-username-pwd").value)
    .then(() => {
        set(ref(db, 'users/' + uid), {
            username: document.getElementById("new-username").value
          });
        alert('DONE');
    })
    .catch(error => {
        alert(error.message);
    });
})
document.getElementById("change-pwd-btn").addEventListener("click", () => {
    let newPassword = document.getElementById("new-pwd-1").value;
    if(newPassword.length < 6){
        alert("Password must be at least 6 characters long");
        return
    }
    if(newPassword != document.getElementById("new-pwd-2").value){
        alert("Passwords do not match");
        return
    }
    updatePassword(auth.currentUser, document.getElementById("new-pwd-1").value)
    .then(() => {
        alert('DONE');
    })
    .catch(error => {
        alert(error.message);
    });
})

document.getElementById("delete-user-btn").addEventListener("click", () => {
    let Password = document.getElementById("delete-acc-pwd").value;

    signInWithEmailAndPassword(auth, udata.currentUser.email, Password)
    .then(() => {
        deleteUser(auth.currentUser).then(() => {
            alert('DONE');
            localStorage.removeItem("userData");
            window.location.href = "../Dashboard/index.html";
          }).catch((error) => {
            alert(error.message);
            return
          });
    })
    .catch(error => {
        alert(error.message);
    });
})

