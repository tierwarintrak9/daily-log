document.getElementById('dateHeader').textContent = new Date().toDateString();

function addTask() {
    var task = document.getElementById('taskInput').value;
    var date = document.getElementById('dateInput').value;
    var time = document.getElementById('timeInput').value;
    if (task && date && time) {
        var li = document.createElement('li');
        li.innerHTML = `<strong>${task}</strong><br><small style="color:#8e8e93">${date} at ${time}</small>`;
        document.getElementById('taskList').appendChild(li);
        
        var saved = localStorage.getItem('tasks') || '';
        localStorage.setItem('tasks', saved + (saved ? ',' : '') + task + '|' + date + '|' + time);
        
        document.getElementById('taskInput').value = '';
    }
}

window.onload = function() {
    var saved = localStorage.getItem('tasks');
    if (saved) {
        saved.split(',').forEach(function(item) {
            var p = item.split('|');
            var li = document.createElement('li');
            li.innerHTML = `<strong>${p[0]}</strong><br><small style="color:#8e8e93">${p[1]} at ${p[2]}</small>`;
            document.getElementById('taskList').appendChild(li);
        });
    }
};
