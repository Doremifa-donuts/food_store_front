//　レビュー複製処理
const review_card = document.getElementById('review_card'); //レビューカード（複製されるもの）
const review_view = document.getElementById('review_view'); //レビューが表示される場所（複製する場所）
let review_count = 1;   //複製されるid名の変更部分

//レビューカードが複製される処理
// review_btn.addEventListener("click",(e) => {
//     const clone_element = review_card.cloneNode(true);  //子要素も含めて複製
//     review_view.appendChild(clone_element);   //現在表示されているものの後に追加
//     review_card.style.display = "flex"
//     clone_element.id = 'review_card' + review_count;    //複製されたレビューカードのid名変更3x

//     review_count++; //複製されたid名の数字を変更する変更する
// });