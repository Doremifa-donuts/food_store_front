import * as url from "./url.js";

const jtiToken = localStorage.getItem('JtiToken');
let review_count = 1;

//レビュー情報を取得
fetch(url.REVIEW_URL, {
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
  const reviews = Object.values(data.Response.Data);

  if (!reviews) return; //レビュー情報がなければ処理を終了

  const review_card = document.getElementById('review_card');
  const review_view = document.getElementById('review_view');

  review_card.style.display = "none"; // テンプレートは非表示

  //レビュー情報を表示する処理
  reviews.forEach((review, index)=> {
    const clone = review_card.cloneNode(true);
    clone.id = `review_card_${index}`;
    clone.style.display = "flex";

    //レビューのコメントを表示
    const commentElement = clone.querySelector('.review_text p');
    if (commentElement) {
      commentElement.innerHTML = review.Comment.replace(/\n/g, '<br>'); //改行を<br>に変換
    }

    //レビューの日付を表示
    const dateElement = clone.querySelector('.review_date');
    if (dateElement) {
      dateElement.textContent = new Date(review.CreatedAt).toLocaleDateString();
    }

    //レビューのいいね数を表示
    const goodElement = clone.querySelector('.review_goodNum');
    if (goodElement) {
      goodElement.textContent = review.Good;
    }

    //レビューの画像を表示
    const imgElement = clone.querySelector('.review_flex img');
    if (imgElement && review.Images.length > 0) {
      fetch(url.IMG_URL + review.Images[0], {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jtiToken}`
        },
        mode: 'cors',
      }).then(images => {
        if (images.status == 200) {
          return images.blob();
        } else {
          throw new Error('画像の取得に失敗しました');
        }
      }).then(imageBlob => {
        imgElement.src = URL.createObjectURL(imageBlob);
      }).catch(error => {
        console.log(error);
      });
    }

    review_view.appendChild(clone);
  });
}).catch(error => {
  console.log(error);
});

//レビューカードが複製される処理
// review_btn.addEventListener("click",(e) => {
//     const clone_element = review_card.cloneNode(true);  //子要素も含めて複製
//     review_view.appendChild(clone_element);   //現在表示されているものの後に追加
//     review_card.style.display = "flex"
//     clone_element.id = 'review_card' + review_count;    //複製されたレビューカードのid名変更3x

//     review_count++; //複製されたid名の数字を変更する変更する
// });