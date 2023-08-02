//load urls
let data;
async function loadUrls() {
  const response = await fetch('urls.json');
  data = await response.json();
}

loadUrls();

function getRandomItem(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

async function getRandomWeb() {
  if (!data) {
    // 如果 data 为空，则调用 loadUrls 来加载数据
    await loadUrls();
  }

  const item = getRandomItem(data);
  const url = item.url;

  // 向内容脚本发送消息，请求在当前页面跳转，并传递 item.title
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'navigate', url: url, title: item.title });
    } else {
      // 如果没有活动标签页，创建一个新的标签页并打开链接
      chrome.tabs.create({ url: url }, function (tab) {
        chrome.tabs.sendMessage(tab.id, { command: 'show_title', title: item.title });
      });
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'start') {
    count = request.count;
    getRandomWeb();
  }
});

