// 监听来自background.js的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === 'navigate') {
    // 获取目标URL，并在当前页面跳转
    const url = message.url;
    window.location.href = url;

    // 获取title，并在页面上创建显示标题的元素
    const title = message.title;
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    titleDiv.style.position = 'fixed';
    titleDiv.style.top = '10px';
    titleDiv.style.right = '10px';
    titleDiv.style.background = 'rgba(255, 255, 255, 0.8)';
    titleDiv.style.padding = '5px';
    titleDiv.style.borderRadius = '5px';
    document.body.appendChild(titleDiv);
  }
});
