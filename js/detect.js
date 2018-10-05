// detect js - Developed by Pooriaanv

let regex = [
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?coin-hive\.com\/lib\/coinhive?.*$/,
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?coinhive\.com?.*$/,
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?hostingcloud\.science\.\/NEHJ\.js?.*$/,
    /^.*coinhive\.min\.js$/,
    /^.*f=NEHJ\.js$/,

];

function detector(script) {

    for (let i in script) {
        let url = script[i].src;
        let innerHtml = script[i].innerHTML;

        if (url !== undefined) {
            for (let j in regex) {
                if (RegExp(regex[j]).test(url)) {
                    detect = true;
                }
            }
        } else if (innerHtml !== undefined) {

            if (RegExp(regex[j]).test(innerHtml)) {
                detect = true;
            }
        }
    }
    if (detect) {
        chrome.storage.sync.get('notification', function (data) {
            if (data.notification) {
                chrome.runtime.sendMessage({text: "detected"});
            }
        });
        console.log('detect');

    }
}


let script = document.getElementsByTagName('script');
let detect = false;

detector(script);

