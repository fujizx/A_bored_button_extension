//load urls
async function loadUrls() {
  const response = await fetch('urls.json');
  const data = await response.json();
}

loadUrls();

function getRandomItem(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

async function getRandomWeb(){
    const item = getRandomItem(data);
    const url = item.url;
    const title = item.title;

    // 使用chrome.tabs.create方法创建新的标签页，并传递title给content.js
    chrome.tabs.create({ url: url }, function (tab) {
      chrome.tabs.sendMessage(tab.id, { command: 'show_title', title: title });
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'start') {
        count = request.count;
        getRandomWeb();
    }
});
