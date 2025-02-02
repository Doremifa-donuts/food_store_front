import * as variable from "./variable.js";
const jtiToken = localStorage.getItem('JtiToken');

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
      var list_id = document.getElementById(reservation_list.id);
      let hour_time = 0;

      //開始位置の計算
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

      console.log(hour, minutes, NumberOfPeople);
      console.log( list_id);
  })
}).catch(error => {
  //エラー処理
})