// content.js

// 监听来自background.js的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === 'show_title') {
    // 获取title，并显示在页面中
    const title = message.title;
    // 假设你想将title显示在页面的body元素内部
    document.body.innerText = title;
  }
});
