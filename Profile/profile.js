
let loadMore = document.querySelector("#load-more");
let submissionsCard = document.querySelector("#submissions-card-body");
loadMore.addEventListener("click", () => {
    submissionsCard.innerHTML += `<a href="">problem y</a> <i> - x days ago</i> <br>`;
});
function myFunction(){
    try {
        fetch("http://localhost:3000/submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "email": localStorage.getItem("email") }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (err) {
        console.log(err);
      }
}
// console.log(JSON.parse(localStorage.getItem("userData")));
