import * as variable from "./variable.js";

//予約状況を取得
fetch(variable.RESERVATION_URL, {
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
        case 404:
            break;
    }
})
.then(data => {
  console.log(data);
  const response = Object.values(data.Response.Data); //予約データ
  let listdiv_num = 1
  //予約情報を表示する処理
  response.forEach(item => {
      var NumberOfPeople = item.NumberOfPeople;   //予約人数
      console.log(hour, minutes, NumberOfPeople);

      const reservation_table = document.getElementById('reservation_table'); //予約状況を追加していく
      const reservation_status = document.createElement('div');   //点線をつける行(div)
      const reservation_list = document.createElement('span');    //人数、予約表示(span)
      reservation_list.innerHTML = NumberOfPeople + '名';    //spanに人数入力
      reservation_table.appendChild(reservation_status);  //予約表示枠に追加  
      reservation_status.appendChild(reservation_list);   //divの中にspanを入れる

      //予約表示style付与
      reservation_status.classList.add('reservation_status'); //点線がつくクラスをつける  
      reservation_list.classList.add('blue');

      //予約時間によって表示をずらす処理
      var ReservationDate = item.ReservationDate; //予約時間
      var hour = ReservationDate.substr(ReservationDate.indexOf('T') + 1, 2); //予約開始時間(時)
      var minutes = ReservationDate.substr(ReservationDate.indexOf('T') + 4, 2);   //予約開始時間(分)
      reservation_list.id = 'reservation_list' + listdiv_num++;   //id名付与

      // if(0 < minutes && minutes < 30){

      // }
      console.log(reservation_status);
  })
}).catch(error => {
  //エラー処理
})