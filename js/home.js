//toggleの選択状況によって表示を変える処理
const switching_toggle = document.getElementById('switching_toggle'); //select取得
const reservation = document.getElementById('reservation'); //予約表
const review = document.getElementById('review'); //レビュー表

// 切り替えるたび
switching_toggle.addEventListener('change', () => {
    console.log(switching_toggle.value); //取得した値確認（消していい）

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

