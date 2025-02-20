import * as url from "./url.js";
import * as security from "./security.js";
//選択された画像を大きく表示
const imgFile = document.querySelector('#img_file'); //画像選択インプット
const storeImg = document.querySelector('#store_img'); //画像を表示するimgタグ
//console.log(img_file);
const jtiToken = localStorage.getItem('JtiToken');
let restaurantDetail = {};

// フォーム要素を取得
const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const urlInput = document.getElementById('url');
const descriptionTextarea = document.getElementById('description');
const timeInput = document.getElementById('time');
const changeButton = document.querySelector('.next_btn');

fetch(url.RESTAURANT_URL, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jtiToken}`
  },
  mode: 'cors',
})
.then(response => security.checkStatus(response))
.then(data => {
  restaurantDetail = data.Response.Data;
  console.log(restaurantDetail);
  // フォーム要素に値を設定
  nameInput.value = restaurantDetail.RestaurantName;
  addressInput.value = restaurantDetail.Address;
  urlInput.value = restaurantDetail.Url;
  descriptionTextarea.value = restaurantDetail.Summary;
  timeInput.value = restaurantDetail.BusinessHours;
  //画像表示
  fetch (url.IMG_URL && restaurantDetail.Images[0], {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jtiToken}`
    },
    mode: 'cors',
  })
  .then(response => {
    if (response.status == 200) {
      return response.blob();
    }
    throw new Error('送信に失敗しました');
  }).then(blob => {
    storeImg.src = URL.createObjectURL(blob);
  })
});

imgFile.addEventListener('change',() => {
  storeImg.src = imgFile.fileUrl;
});