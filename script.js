const USER = “admin”;
const PASS = “1234”;

function login() {
const u = document.getElementById(“username”).value;
const p = document.getElementById(“password”).value;

if (u === USER && p === PASS) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");
    loadData();
} else {
    alert("Invalid login");
}

}

function addEntry() {
const task = document.getElementById(“task”).value;
if (!task) return;

const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();
const data = JSON.parse(localStorage.getItem("logs") || "[]");
data.push({ task, date, time });
localStorage.setItem("logs", JSON.stringify(data));
document.getElementById("task").value = "";
loadData();

}

function loadData() {
const table = document.querySelector(”#logTable tbody”);
table.innerHTML = “”;

const data = JSON.parse(localStorage.getItem("logs") || "[]");
data.forEach(item => {
    const row = `<tr>
        <td>${item.task}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
    </tr>`;
    table.innerHTML += row;
});

}
