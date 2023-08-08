//load urls
let data;
async function loadUrls() {
  const response = await fetch('urls.json');
  data = await response.json();
}

loadUrls();

function getRandomItem(data) {
  console.log('data.length=='+data.length);
  const randomIndex = Math.floor(Math.random() * data.length);
  console.log('randomIndex=='+randomIndex);
  return data[randomIndex];
}

async function getRandomWeb() {
  if (!data) {
    // 如果 data 为空，则调用 loadUrls 来加载数据
    await loadUrls();
  }

  const item = getRandomItem(data);
  const url = item.url;

  // 获取当前活动的标签页
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    if (currTab) { // 如果存在一个活动的标签页
      // 在当前标签页打开新的URL，并等待标签页加载完成
      chrome.tabs.update(currTab.id, { url: url }, function (tab) {
        // 在标签页加载完成后，向content.js发送消息
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tabId, { command: 'show_title', title: item.title });
          }
        });
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
