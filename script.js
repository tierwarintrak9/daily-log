function addTask() {
    var task = document.getElementById('taskInput').value;
    if (task) {
        var li = document.createElement('li');
        li.textContent = new Date().toLocaleDateString() + ": " + task;
        document.getElementById('taskList').appendChild(li);
        
        // บันทึกลงเครื่อง
        var savedTasks = localStorage.getItem('myLogs') || '';
        localStorage.setItem('myLogs', savedTasks + task + '|');
        document.getElementById('taskInput').value = '';
    }
}

// โหลดข้อมูลเก่าตอนเปิดแอป
window.onload = function() {
    var logs = localStorage.getItem('myLogs');
    if (logs) {
        var items = logs.split('|');
        items.forEach(function(item) {
            if (item) {
                var li = document.createElement('li');
                li.textContent = item;
                document.getElementById('taskList').appendChild(li);
            }
        });
    }
};
