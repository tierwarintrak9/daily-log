const USER = “admin”;
const PASS = “1234”;

let currentDate = new Date();
let selectedKey = “”;

// LOGIN
function login() {
if (
document.getElementById(“username”).value === USER &&
document.getElementById(“password”).value === PASS
) {
document.getElementById(“loginPage”).style.display = “none”;
document.getElementById(“mainPage”).classList.remove(“hidden”);
renderCalendar();
} else {
alert(“Wrong login”);
}
}

// CALENDAR
function renderCalendar() {
const calendar = document.getElementById(“calendar”);
calendar.innerHTML = “”;

const year = currentDate.getFullYear();
const month = currentDate.getMonth();
document.getElementById("monthLabel").innerText =
    currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });
const days = new Date(year, month + 1, 0).getDate();
for (let d = 1; d <= days; d++) {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = d;
    div.onclick = function () {
        selectedKey = year + "-" + month + "-" + d;
        document.getElementById("entryBox").classList.remove("hidden");
        document.getElementById("selectedDate").innerText =
            d + " / " + (month + 1) + " / " + year;
        loadEntries();
    };
    calendar.appendChild(div);
}

}

// SAVE
function saveEntry() {
const note = document.getElementById(“noteInput”).value;
if (!note) return;

const time = new Date().toLocaleTimeString();
const data = JSON.parse(localStorage.getItem("calendarLogs") || "{}");
if (!data[selectedKey]) data[selectedKey] = [];
data[selectedKey].push({ note: note, time: time });
localStorage.setItem("calendarLogs", JSON.stringify(data));
document.getElementById("noteInput").value = "";
loadEntries();

}

// LOAD
function loadEntries() {
const table = document.querySelector(”#logTable tbody”);
table.innerHTML = “”;

const data = JSON.parse(localStorage.getItem("calendarLogs") || "{}");
const list = data[selectedKey] || [];
list.forEach(item => {
    const row = "<tr><td>" + item.note + "</td><td>" + item.time + "</td></tr>";
    table.innerHTML += row;
});

}
