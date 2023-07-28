
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'updateRemainingCount') {
        document.getElementById('remaining').textContent = 'Remaining count: ' + request.count;
    }
});

document.getElementById('start').addEventListener('click', () => {
    const count = document.getElementById('count').value;
    chrome.runtime.sendMessage({command: 'start', count: count});
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({command: 'stop'});
});


// popup.js
// 创建websocket
const socket = new WebSocket('ws://localhost:8000'); 

// 接收消息,处理DOM
socket.onmessage = e => {
  const html = e.data;
  const div = document.createElement('div');
  div.innerHTML = html;

  // 查找目标元素插入
  const cardContainer = div.querySelector('.cardContainer');
  document.getElementById('container').appendChild(cardContainer);
}