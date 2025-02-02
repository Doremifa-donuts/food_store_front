import * as url from "./url.js";

//toggleの選択状況によって表示を変える処理
const switchingToggle = document.getElementById('switching_toggle'); //select取得
const reservation = document.getElementById('reservation'); //予約表
const review = document.getElementById('review'); //レビュー表
const selectValue = switchingToggle.value;  //optionのvalue取得
const jtiToken = localStorage.getItem('JtiToken');

// 初期画面などで
if(selectValue == 0){
    //0で予約表表示
    reservation.style.display = 'block';    //予約表を見えるように
    review.style.display = 'none';  //レビューを見えないように
}else{
    review.style.display= 'block';  //レビューを見えるように
    reservation.style.display = 'none'; //予約表を見えないように
}

// 混雑状況ボタン、押したら大きくなる処理
const congestion_situation = document.querySelectorAll('.congestion_situation'); //混雑状況ボタン

congestion_situation.forEach(button => {
    button.addEventListener("click", (e) => {
        const id_value = button.id; //どの状況が選択されているかID名で取得

        //現在大きく表示されているものがあれば小さくする
        if(document.querySelector('.congestion_Big')){
            var big_value = document.querySelector('.congestion_Big'); //現在大きく表示されているもの
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


// 切り替えるたび
switchingToggle.addEventListener('change', () => {
    const selectValue = switchingToggle.value;  //optionのvalue取得

    if(selectValue == 0){
        //0で予約表表示
        reservation.style.display = 'block';    //予約表を見えるように
        review.style.display = 'none';  //レビューを見えないように

    }else{
        review.style.display= 'block';  //レビューを見えるように
        reservation.style.display = 'none'; //予約表を見えないように

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
            }
        })
        .then(data => {
            const response = Object.values(data.Response.Data);
            //レビュー情報を表示する処理
            response.forEach(item => {
                console.log(item.Comment);
            })
        }).catch(error => {
            console.log(error);
        });
    }
});


//お助けブースト周辺人数が変更される処理
const boost_num = document.getElementById('boost_num');     //周辺人数が表示されている部分
let boost_people = 7;   //周辺人数

boost_num.innerText = boost_people;     //表示される人数の変更