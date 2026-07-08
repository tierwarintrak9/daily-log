var USER = “admin”;
var PASS = “1234”;

var currentDate = new Date();
var selectedKey = “”;

// LOGIN
function login() {
var u = document.getElementById(“username”).value;
var p = document.getElementById(“password”).value;

if (u === USER && p === PASS) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").className = "";
    renderCalendar();
} else {
    alert("Wrong username or password");
}

}

// CALENDAR
function renderCalendar() {
var calendar = document.getElementById(“calendar”);
calendar.innerHTML = “”;

var year = currentDate.getFullYear();
var month = currentDate.getMonth();
document.getElementById("monthLabel").innerHTML =
    (month + 1) + " / " + year;
var days = new Date(year, month + 1, 0).getDate();
for (var d = 1; d <= days; d++) {
    var div = document.createElement("div");
    div.className = "day";
    div.innerHTML = d;
    div.onclick = (function(day) {
        return function() {
            selectedKey = year + "-" + month + "-" + day;
            document.getElementById("entryBox").className = "";
            document.getElementById("selectedDate").innerHTML =
                day + " / " + (month + 1) + " / " + year;
            loadEntries();
        };
    })(d);
    calendar.appendChild(div);
}

}

// SAVE
function saveEntry() {
var note = document.getElementById(“noteInput”).value;
if (!note) return;

var time = new Date().toLocaleTimeString();
var data = localStorage.getItem("calendarLogs");
if (!data) data = "{}";
data = JSON.parse(data);
if (!data[selectedKey]) data[selectedKey] = [];
data[selectedKey].push({
    note: note,
    time: time
});
localStorage.setItem("calendarLogs", JSON.stringify(data));
document.getElementById("noteInput").value = "";
loadEntries();

}

// LOAD
function loadEntries() {
var table = document.querySelector(”#logTable tbody”);
table.innerHTML = “”;

var data = localStorage.getItem("calendarLogs");
if (!data) data = "{}";
data = JSON.parse(data);
var list = data[selectedKey] || [];
for (var i = 0; i < list.length; i++) {
    var row = "<tr><td>" + list[i].note + "</td><td>" + list[i].time + "</td></tr>";
    table.innerHTML += row;
}

}
