//toggleの選択状況によって表示を変える処理
const switching_toggle = document.getElementById('switching_toggle'); //select取得
const reservation = document.getElementById('reservation'); //予約表
const review = document.getElementById('review'); //レビュー表
const selectValue = switching_toggle.value;  //optionのvalue取得

// 初期画面などで
if(selectValue == 0){
    //0で予約表表示
    reservation.style.display = 'block';    //予約表を見えるように
    review.style.display = 'none';  //レビューを見えないように
}else{
    review.style.display= 'block';  //レビューを見えるように
    reservation.style.display = 'none'; //予約表を見えないように
}

// 切り替えるたび
switching_toggle.addEventListener('change', () => {
    const selectValue = switching_toggle.value;  //optionのvalue取得

    if(selectValue == 0){
        //0で予約表表示
        reservation.style.display = 'block';    //予約表を見えるように
        review.style.display = 'none';  //レビューを見えないように
    }else{
        review.style.display= 'block';  //レビューを見えるように
        reservation.style.display = 'none'; //予約表を見えないように
        
    }
});


// 混雑状況ボタン、押したら大きくなる処理
const congestion_situation = document.querySelectorAll('.congestion_situation'); //混雑状況ボタン

congestion_situation.forEach(button => {
    button.addEventListener("click", (e) => {
        const id_value = button.id; //どの状況が選択されているかID名で取得
      
        //現在大きく表示されているものがあれば小さくする
        if(document.querySelector('.congestion_Big')){
            big_value = document.querySelector('.congestion_Big'); //現在大きく表示されているもの
            big_value.classList.remove('congestion_Big');   //大きくするスタイルを外す
            big_value.classList.add('congestion_small');    //小さいときにつけるstyleをつける
        }

        //選択されたボタンを大きくする
        const select_situation = document.getElementById(id_value); //選択されたボタン
        select_situation.classList.toggle('congestion_Big'); //大きくするスタイルをつける

        //大きく表示されていたら、小さくするスタイルを外す
        if(select_situation.classList.contains('congestion_Big')){
            select_situation.classList.remove('congestion_small'); //小さく表示するスタイルを外す
        }
    });
});


//　レビュー複製処理
const review_card = document.getElementById('review_card'); //レビューカード（複製されるもの）
const review_btn = document.getElementById('review_btn'); //仮で作ったカード複製ボタン(動きを確認するための仮置き)
const review_view = document.getElementById('review_view'); //レビューが表示される場所（複製する場所）
let review_count = 1;   //複製されるid名の変更部分

//レビューカードが複製される処理(動きを確認するための仮置きボタンで)
review_btn.addEventListener("click",(e) => {
    const clone_element = review_card.cloneNode(true);  //子要素も含めて複製
    review_view.appendChild(clone_element);   //現在表示されているものの後に追加
    review_card.style.display = "flex"; //見えなくしているものを複製しているので見えるように
    clone_element.id = 'review_card' + review_count;    //複製されたレビューカードのid名変更3x

    review_count++; //複製されたid名の数字を変更する変更する
});


//お助けブースト周辺人数が変更される処理
const boost_num = document.getElementById('boost_num');     //周辺人数が表示されている部分
let boost_people = 7;   //周辺人数 

boost_num.innerText = boost_people;     //表示される人数の変更




