import axios from 'axios';

// ログインボタン
const loginBtn = document.getElementById('login-btn');

// ログインボタンを押された時に入力情報取得
loginBtn.addEventListener('click', () => {
    const store_number = document.getElementById('store_number').value; //店舗番号
    const password = document.getElementById('password').value; //パスワード
    console.log(store_number,password);

    //ログイン処理
    axios.post(`${API_URL}/login`, {
        "MailAddress": store_number,
        "Password": password
    }).then((res) => {
        // ログイン成功
        console.log(res);
    }).catch((err) => {
        // ログイン失敗
        console.log(err);
    })
});

