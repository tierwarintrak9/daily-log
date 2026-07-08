document.getElementById('currentDate').textContent = new Date().toDateString();

function addTask() {
    var task = document.getElementById('taskInput').value;
    var date = document.getElementById('dateInput').value;
    if (task && date) {
        var li = document.createElement('li');
        li.innerHTML = `<span><strong>${task}</strong><br><small>${date}</small></span>`;
        document.getElementById('taskList').appendChild(li);
        
        // บันทึกลง LocalStorage
        var saved = localStorage.getItem('tasks') || [];
        localStorage.setItem('tasks', (saved ? saved + ',' : '') + task + '|' + date);
        
        document.getElementById('taskInput').value = '';
    }
}

window.onload = function() {
    var saved = localStorage.getItem('tasks');
    if (saved) {
        saved.split(',').forEach(function(item) {
            var parts = item.split('|');
            var li = document.createElement('li');
            li.innerHTML = `<span><strong>${parts[0]}</strong><br><small>${parts[1]}</small></span>`;
            document.getElementById('taskList').appendChild(li);
        });
    }
};
