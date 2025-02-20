import * as url from "./url.js";
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
const changeButton = document.querySelector('.next_btn');

fetch(url.RESTAURANT_URL, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jtiToken}`
  },
  mode: 'cors',
})
.then(response => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:   //認証情報が正しくなければログイン画面に遷移
      localStorage.removeItem('JtiToken');
      window.location.href = './login.html';
      return;
    case 404:
      break;
    case 500:
      localStorage.removeItem('JtiToken');
      window.location.href = './login.html'
  }
})
.then(data => {
  restaurantDetail = data.Response.Data;
  console.log(restaurantDetail);
  // フォーム要素に値を設定
  nameInput.value = restaurantDetail.RestaurantName;
  addressInput.value = restaurantDetail.Address;
  urlInput.value = restaurantDetail.Url;
  descriptionTextarea.value = restaurantDetail.Summary;
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