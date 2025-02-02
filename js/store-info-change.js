import { RESTAURANT_URL } from "./url.js";
//選択された画像を大きく表示
const imgFile = document.querySelector('#img_file'); //画像選択インプット
const storeImg = document.querySelector('#store_img'); //画像を表示するimgタグ
//console.log(img_file);
const jtiToken = localStorage.getItem('JtiToken');
let restaurantDetail = {};

fetch(RESTAURANT_URL, {
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
  }
})
.then(data => {
  restaurantDetail = data.Response.Data;
  console.log(restaurantDetail.Address)
});

imgFile.addEventListener('change',() => {
  storeImg.src = imgFile.fileUrl;
});