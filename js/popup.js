// popup js - Developed by Pooriaanv

// get Turn on/off status
chrome.storage.sync.get('status', function (data) {
    document.getElementById('status').checked = data.status;
    console.log('s');
});

// get notification status
chrome.storage.sync.get('notification', function (data) {
    document.getElementById('notification').checked = data.notification;
    console.log('s');
});

// get element of turn on/off checkbox
let status = document.getElementById("status");

// change status value on checkbox click
status.onclick = function () {
    chrome.storage.sync.set({'status': status.checked}, function () {
        console.log('turned ' + status.checked);
    });
}

// get element of notification checkbox
let notification = document.getElementById("notification");

// change status value on checkbox click
notification.onclick = function () {
    chrome.storage.sync.set({'notification': notification.checked}, function () {
        console.log('notification turned ' + notification.checked);
    });
}