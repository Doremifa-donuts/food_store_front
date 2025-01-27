//選択された画像を大きく表示
const img_file = document.querySelector('#img_file'); //画像選択インプット
const store_img = document.querySelector('#store_img'); //画像を表示するimgタグ
console.log(img_file);

img_file.addEventListener('change',() => { 
  store_img.src = img_file.fileUrl;
});