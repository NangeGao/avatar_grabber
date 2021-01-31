const https = require('https');
const fs = require('fs');
const request = require('request');

function spider(pn) {
  https.get(`https://story.hao.360.cn/api/recommend/storyList?user_id=asfasf&session_id=cf3eb7742254e472571f9442f083045d&action=1&page=${pn}`, res => {
    let rawData = '';

    res.setEncoding('utf-8');
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', async () => {
      try {
        const parsedData = JSON.parse(rawData);
        const list = parsedData.data.data;
        
        console.log('=================================================');
        list.forEach(item => {
          const imgUrl = item.user.avatar;
          console.log(imgUrl);
          downloadImage(imgUrl);
        })
        console.log('=================================================');
      } catch(error){
        console.log(error.toString);
      }
    })
  });
}

function downloadImage(url) {
  const imgName = url.split('/').pop();
  request(url).pipe(fs.createWriteStream(`./images/${imgName}`)).on('end', () =>{
      console.log(downloadImage, '下载完成');
    }).on('error', (err) =>{
      console.log(downloadImage, '下载失败：', err);
    }
  );
}

let n = 1;
function init() {
  if (n > 100) {
    return;
  }
  console.log(n);
  spider(n);

  setTimeout(() => {
    n++;
    init();
  }, 10000);
}

init();
