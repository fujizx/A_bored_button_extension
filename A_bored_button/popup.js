document.getElementById('start').addEventListener('click', () => {
    //跳转一个网页
    chrome.runtime.sendMessage({command: 'start'});
});