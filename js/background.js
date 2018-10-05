// Background js - Developed by Pooriaanv

// callback for webRequest
let callback = function () {
    return {cancel: true};
}
// Notification Callback
let notificationCallback = function (message, sender, sendResponse) {
    chrome.storage.sync.get('status', function (data) {
        if (data.status) {
            if (message.text === "detected") {
                alert('⚠ Crypto Mining Scripts DETECTED And has been BLOCKED ⛔ !\n\n ENJOY WEB SURFING ⛷');
            }
        } else {
            if (message.text === "detected") {
                alert('⚠ Crypto Mining Scripts DETECTED! ');
            }
        }
    });
};

// add Listener for webRequest (block connection)
function blockAddListener() {
    chrome.webRequest.onBeforeRequest.addListener(
        callback,
        {
            urls: [
                "*://*.coinhive.com/*",
                "*://*.coin-hive.com/lib/coinhive/*",
                "*://*.hostingcloud.science./NEHJ.js/*",
            ]
        }, ["blocking"]);
}

// remove Listener for webRequest  (unblock)
function blockRemoveListener() {
    chrome.webRequest.onBeforeRequest.removeListener(callback);
}
chrome.storage.sync.get('notification', function (data) {

    if (data.notification) {
        chrome.runtime.onMessage.addListener(notificationCallback);
    } else {
        chrome.runtime.onMessage.removeListener(notificationCallback);
    }
});
chrome.storage.sync.get('status', function (data) {
    if (data.status == true) {
        blockAddListener();
    } else if (data.status == false) {
        blockRemoveListener();
    }
});

// fire on storage changes
chrome.storage.onChanged.addListener(function (changes) {

    for (key in changes) {
        if (key == 'status') {
            chrome.storage.sync.get('status', function (data) {
                if (data.status == true) {
                    blockAddListener();
                } else if (data.status == false) {
                    blockRemoveListener();
                }
            });
        } else if (key == 'notification') {
            chrome.storage.sync.get('notification', function (data) {

                if (data.notification) {
                    chrome.runtime.onMessage.addListener(notificationCallback);
                } else {
                    chrome.runtime.onMessage.removeListener(notificationCallback);
                }
            });
        }
    }

});

// fire on first install
chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.sync.set({'notification': true});

    chrome.storage.sync.set({'status': true});
});
