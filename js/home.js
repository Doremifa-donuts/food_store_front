//toggleの選択状況によって表示を変える処理
const switching_toggle = document.getElementById('switching_toggle'); //select取得
const reservation = document.getElementById('reservation') //予約表
const review = document.getElementById('review') //レビュー表

// 切り替えるたび
switching_toggle.addEventListener('change', () => {
    console.log(switching_toggle.value); //取得した値確認（消していい）

    const selectValue = switching_toggle.value;  //optionのvalue取得

    if(selectValue == 0){
        //0で予約表表示
        reservation.style.display = 'block';
        review.style.display = 'none';
    }else{
        review.style.display= 'block'
        reservation.style.display = 'none';
    }
});

