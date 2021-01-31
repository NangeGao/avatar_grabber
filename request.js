const https = require('https');
const fs = require('fs');
const request = require('request');


function downloadImage(url) {
  const imgName = url.split('/').pop();
  request(url).pipe(fs.createWriteStream(`./images/${imgName}`)).on('end', () =>{
      console.log(downloadImage, '下载完成');
    }).on('error', (err) =>{
      console.log(downloadImage, '下载失败：', err);
    }
  );
}

const url = "https://www.zhihu.com/api/v4/members/long-ya-57-84/followers?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=40&limit=20";

function spider() {
  request({
    url: url,
    headers: {
      "content-type": "application/json",
      "referer": "https://www.zhihu.com/people/long-ya-57-84/followers?page=3",
      "sec-ch-ua": '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
      "sec-ch-ua-mobile": '?0',
      "sec-fetch-dest": 'empty',
      "sec-fetch-mode": 'cors',
      "sec-fetch-site": 'same-origin',
      "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
      "x-ab-param": 'qap_question_author=0;qap_question_visitor= 0;li_panswer_topic=0;tp_dingyue_video=0;pf_noti_entry_num=0;li_video_section=0;se_ffzx_jushen1=0;li_paid_answer_exp=0;tp_topic_style=0;li_vip_verti_search=0;top_test_4_liguangyi=1;li_sp_mqbk=0;tp_contents=2;zr_slotpaidexp=1;pf_adjust=0;li_edu_page=old;zr_expslotpaid=1;tp_zrec=0',
      "x-ab-pb": 'ClJqAQ8LiQxDALcANwwBC0cAZwC0ANwL4AtsAM8LWAFpAVYMmwsIAEABNAx1DEwLQgBoAC4B9AvsChsAxQBPAWIB1wu0CpYLBwxSC+QKYAs/ALULEikAAAAVAQEAAAAAAAAACwEAAQACAQAAAAUCAAABAAAAAAAAAAABAAAAAw==',
      "x-requested-with": 'fetch',
      "x-zse-83": '3_2.0',
      "x-zse-86": '2.0_aLt0ei9ygG2Ygh28B8FB6AL02_Nxo7tyMMt0gvL8c0tY',
      "x-zst-81": '3_2.0aR_sn77yn6O92wOB8hPZnQr0EMYxc4f18wNBUgpTSHtueT20K6P0ETuy-LS9-hp1DufI-we8gGHPgJO1xuPZ0GxCTJHR7820XM20cLRGDJXfgGCBxupMuD_IS4cpr4w0mRPO7HoY70SfquPmz93mhDQyiqV9ebO1hwOYiiR0ELYuUrxmtDomqU7ynXtOnAoTh_PhRDSTFeLmeUCmjDVMOguGfCcO0hc_RCtLreVMqgeYQBwqjGOBqwL1iDHLjgOY3h2Tv6ULtBOf8CFKlJL1EbgmzcXYqveqNBXmkvS16h3_ChNGbuYGArLmuwo83UoGQqVmDbg_zCHxehOfXBF8sq9qJB2mPBoMqGV8qheCkbNxrGtYuuF_8cHCOqkw-he_2wHmSHuOSiOYfbxLH9Xy_DU8OrOOBCCKMrS1UCLGQ8V_XGg_xgcG6gU9FrS9QUpLEgXGUuSqZwOVeuVmYHwK2Ce1uhNBHGCMpvO8S4x0WheK6QSC',
      "cookie": '_zap=473c4273-9f8b-4413-8ef7-7f3024188bcd; d_c0="AEDWnQhsvBCPToC0KbadLU1V8tdGKTjCyu8=|1580302693"; _ga=GA1.2.850920166.1582881514; _xsrf=k2vg3mH16BxkiSFCsb0nRxsTsk309jHN; __guid=74140564.574866874639799100.1594087766689.1265; q_c1=c8596fb3baa840c39790f3fa269f0cba|1609729635000|1580384677000; tshl=; tst=f; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1611970358,1611974186,1612057964,1612058028; capsion_ticket="2|1:0|10:1612058463|14:capsion_ticket|44:NTViOTc3YjJiMzU2NGE1NWI3OTk0ZTVlY2RlNjljMWU=|9a6d264edb0c1e89fb0fc27d9537f5313f09dd91aa5d39df5541d8c8b7ed4eeb"; SESSIONID=cEcOukvvlsiQmoaklRDzwv3U3BwecwEuW5f6JvoLksc; JOID=UlEcB0l0XsawwqeHOHCV249eU10gHhuo-bXF8UMaJK_sqcrvUx1c29TJroozzCuSPKEI6_cdebLvST2mdUonEAc=; osd=U18UA0N1UM60yKaJMHSf2oFWV1chEBOs87TL-UcQJaHkrcDuXRVY0dXHpo45zSWaOKsJ5f8Zc7PhQTmsdEQvFA0=; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1612058478; KLBRSID=0a401b23e8a71b70de2f4b37f5b4e379|1612058479|1612057966'
    },
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(typeof(body));
      const res = JSON.parse(body);
      const avatarList = res.data.map(user => user.avatar_url);
      console.log(avatarList);
      avatarList.map(item => {
        downloadImage(item);
      })
    }
  }); 
}

spider();
