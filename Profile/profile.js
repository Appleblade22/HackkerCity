let loadMore = document.querySelector('#load-more');
let submissionsCard = document.querySelector('#submissions-card-body');
loadMore.addEventListener('click', () => {
    submissionsCard.innerHTML += `<a href="">problem y</a> <i> - x days ago</i> <br>`;
})

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