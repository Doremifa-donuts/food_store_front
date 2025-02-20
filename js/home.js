import * as url from "./url.js";
import * as security from "./security.js"

//toggleの選択状況によって表示を変える処理
const switchingToggle = document.getElementById('switching_toggle'); //select取得
const reservation = document.getElementById('reservation'); //予約表
const review = document.getElementById('review'); //レビュー表
const jtiToken = localStorage.getItem('JtiToken');

//予約状況を取得
function reservation_view() {
    reservation.style.display = 'block';
    review.style.display = 'none';

    //予約状況を取得
    fetch(url.RESERVATION_URL, {
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
            case 401:
                localStorage.removeItem('JtiToken');
                window.location.href = './login.html';
            case 404:
                break;
            case 500:
                localStorage.removeItem('JtiToken');
                window.location.href = './login.html'
        }
    })
    .then(data => {
        //予約表を空にする
        while (reservation_table.children.length > 1) {
            reservation_table.removeChild(reservation_table.lastChild);
        }

        const response = Object.values(data.Response.Data);
        let listdiv_num = 1;

        //予約情報を表示する処理
        response.forEach(item => {
            var NumberOfPeople = item.NumberOfPeople;
            var UserName = item.UserName;

            const reservation_table = document.getElementById('reservation_table'); //予約状況を追加していく
            const reservation_status = document.createElement('div');               //点線をつける行(div)
            const reservation_list = document.createElement('div');                 //人数、予約表示(span)
            const reservation_num = document.createElement('span');                 //人数、予約表示(span)
            const reservation_name = document.createElement('p');                   //人数、予約表示(span)
            reservation_num.innerHTML = NumberOfPeople + '名';                      //spanに人数入力
            reservation_name.innerHTML = UserName + '様';

            reservation_table.appendChild(reservation_status);                      //予約表示枠に追加
            reservation_status.appendChild(reservation_list);                       //divの中にspanを入れる
            reservation_list.appendChild(reservation_num);
            reservation_list.appendChild(reservation_name);

            reservation_status.classList.add('reservation_status');                  //点線がつくクラスをつける
            reservation_list.classList.add('blue');

            var ReservationDate = item.ReservationDate; //予約時間
            var hour = ReservationDate.substr(ReservationDate.indexOf('T') + 1, 2); //予約開始時間(時)
            var minutes = ReservationDate.substr(ReservationDate.indexOf('T') + 4, 2);   //予約開始時間(分)
            reservation_list.id = 'reservation_list' + listdiv_num++;   //id名付与
            var list_id = document.getElementById(reservation_list.id);

            //開始位置の計算
            let hour_time = 0;
            hour = 12;
            hour -= 11;
            //３０分刻み
            if(0 < minutes && minutes < 30){
                hour_time = hour + 0.5;
            }else if(30 < minutes && minutes <= 59){
                hour_time = hour + 1;
            }

            //開始位置のずれ
            if(hour == 0){
                hour_time += 0.1;
            }else if(hour == 1){
                hour_time += 0.2;
            }else if(hour == 2 || hour == 3){
                hour_time += 0.3;
            }else if(hour == 4 || hour == 5){
                hour_time += 0.4;
            }else if(hour == 6 || hour == 7){
                hour_time += 0.5;
            }else if(hour == 8 || hour == 9){
                hour_time += 0.6;
            }

            list_id.style.marginLeft = "calc((100% / 12)*"+ hour_time +")";
        });
    })
    .catch(error => {
        console.error('Error fetching reservation data:', error);
    });
}

//レビューを取得
function review_view() {
    review.style.display = 'block';
    reservation.style.display = 'none';

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
        if (!reviews) return;   //レビュー情報がなければ処理を終了

        const review_card = document.getElementById('review_card');
        const review_view = document.getElementById('review_view');

        //レビューカードを空にする
        const children = Array.from(review_view.children);
        children.forEach(child => {
            if (child.id !== 'review_card') {
                review_view.removeChild(child);
            }
        });

        review_card.style.display = "none";

        reviews.forEach((review, index) => {
            const clone = review_card.cloneNode(true);
            clone.id = `review_card_${index}`;
            clone.style.display = "flex";

            //レビューのコメントを表示
            const commentElement = clone.querySelector('.review_text p');
            if (commentElement) {
                commentElement.innerHTML = review.Comment.replace(/\n/g, '<br>');
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
                })
                .then(images => {
                    if (images.status == 200) {
                        return images.blob();
                    }
                    throw new Error('画像の取得に失敗しました');
                })
                .then(imageBlob => {
                    imgElement.src = URL.createObjectURL(imageBlob);
                })
                .catch(error => {
                    console.log(error);
                });
            }

            review_view.appendChild(clone);
        });
    })
    .catch(error => {
        console.error('Error fetching review data:', error);
    });
}

//ブースト人数
function nearby_view() {
    const boost_num = document.getElementById('boost_num');
    fetch(url.NEARBY_URL, {
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
        boost_num.innerHTML = data.Response.Data.count;
    })
    .catch(error => {
        console.error('Error fetching boost data:', error);
    });
}

//現在の店舗の状態を取得
function getStatus() {
    fetch(url.RESTAURANT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jtiToken}`
        },
        mode: 'cors',
    }).
    then(response => {
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
        const status = data.Response.Data.BusyStatus;
        if(status == 'Free'){
            congestion_situation[0].classList.remove('congestion_small');
            congestion_situation[0].classList.add('congestion_Big');
        }else if(status == 'Spare'){
            congestion_situation[1].classList.remove('congestion_small');
            congestion_situation[1].classList.add('congestion_Big');
        }else if(status == 'Packed'){
            congestion_situation[2].classList.remove('congestion_small');
            congestion_situation[2].classList.add('congestion_Big');
        }
    })
    .catch(error => {
        console.error('Error fetching status:', error);
    });
}

// 初期表示
const selectValue = switchingToggle.value;
if(selectValue == 0) {
    reservation_view();
    nearby_view();
    getStatus();
} else {
    review_view();
    nearby_view();
    getStatus();
}

// 切り替えられたときの処理
switchingToggle.addEventListener('change', () => {
    const selectValue = switchingToggle.value;
    if(selectValue == 0) {
        reservation_view();
        nearby_view();
    } else {
        review_view();
        nearby_view();
    }
});


//店舗の空き情報
const congestion_situation = document.querySelectorAll('.congestion_situation');
congestion_situation.forEach(button => {
    button.addEventListener("click", async (e) => {
        const id_value = button.id;

        if(document.querySelector('.congestion_Big')){
            var big_value = document.querySelector('.congestion_Big');
            big_value.classList.remove('congestion_Big');
            big_value.classList.add('congestion_small');
        }

        const select_situation = document.getElementById(id_value);
        select_situation.classList.toggle('congestion_Big');

        if(select_situation.classList.contains('congestion_Big')){
            select_situation.classList.remove('congestion_small');
        }

        let mode = null;
        switch(id_value){
            case 'none':
                mode = 'Free';
                break;
            case 'some':
                mode = 'Spare';
                break;
            case 'full':
                mode = 'Packed';
                break;
        }
        await fetch(url.MODE_URL + mode, {
            method: 'PUT',
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
                case 400:
                    throw new Error('店舗情報の更新に失敗しました');
                case 401:   //認証情報が正しくなければログイン画面に遷移
                    localStorage.removeItem('JtiToken');
                    window.location.href = './login.html';
                    return;
                case 404:
                    throw new Error('店舗情報の取得に失敗しました');
                case 500:
                    localStorage.removeItem('JtiToken');
                    window.location.href = './login.html';
                    return;
            }
        })
        .catch(error => {
            console.error('Error fetching mode data:', error);
            // エラー時はボタンの状態を元に戻す
            select_situation.classList.remove('congestion_Big');
            select_situation.classList.add('congestion_small');
            if (big_value) {
                big_value.classList.remove('congestion_small');
                big_value.classList.add('congestion_Big');
            }
        });
    });
});

const boost_btn = document.getElementById('boost_btn');
boost_btn.addEventListener('click', () => {
    let start_at = document.querySelector('input[name="before"]').value;
    let end_at = document.querySelector('input[name="after"]').value;
    let great_text = document.getElementById('great_text').value;
    let situation_text = document.getElementById('situation_text').value;

    //時間が設定されていなかった場合
    if(!start_at || !end_at) return;
    //お得情報がなかった場合
    if(!great_text) return;

    //バリデーション
    try {
        great_text = security.escapeHtml(great_text);
        situation_text = security.escapeHtml(situation_text);
    }catch (error) {
        console.log(error);
        return;
    }

    //今日の日付を取得
    const today = new Date();
    //YYYY-MM-DDを取得する
    const dateStr = today.toISOString().split('T')[0];
    //JSTオフセット
    start_at = new Date(`${dateStr}T${start_at}:00`);
    end_at = new Date(`${dateStr}T${end_at}:00`);
    start_at.setHours(start_at.getHours() + 9);
    end_at.setHours(end_at.getHours() + 9);
    //時間形式をサーバーが求める形に変換
    start_at = start_at.toISOString().replace('Z', '+09:00');
    end_at = end_at.toISOString().replace('Z', '+09:00');

    //ブースト開始
    fetch(url.CAMPAIGN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jtiToken}`
        },
        body: JSON.stringify({
            StartAt: start_at,
            EndAt: end_at,
            Description: situation_text,
            DiscountOffer: great_text
        }),
        mode: 'cors',
    })
    .then(response => {
        switch (response.status) {
            case 200:
                return response.json();
            case 400:
                throw new Error('トークンのフォーマットエラーです');
            case 401:
                throw new Error('情報が不足しています');
            case 404:
                throw new Error('エンドポイントが見つかりません');
            default:
                throw new Error('送信に失敗しました');
        }
    }).then(data => {
        console.log('送信しました');
    }).catch(error => {
        console.log(error);
    })
});